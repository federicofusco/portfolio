import { RefObject } from "react";
import * as three from "three";

class Boid {
    // The boid's velocity and direction
    velocity: three.Vector3;
    // The boid's variation of velocity
    acceleration: three.Vector3 = new three.Vector3(0, 0, 0);
    // The height:base ratio of the boid's body
    size: number = 0.1;
    // The minimum speed
    minSpeed: number;
    // The maximum speed
    maxSpeed: number;
    // The maximum force that can be applied to the acceleration
    maxForce: number;
    // The boid's color
    color: number;
    // The boid's mesh
    mesh: three.Group;

    constructor(color: number, minSpeed: number, maxSpeed: number, maxForce: number) {

        // Sets the constants
        this.color = color;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;

        // Sets a random velocity
        this.velocity = new three.Vector3()
            .randomDirection()
            .clampLength(this.minSpeed, this.maxSpeed)
            .setZ(0);

        // Creates the group
        this.mesh = new three.Group();
        this.renderBody();

    }

    /**
     * Renders the boid's body: a triangle of base this.size
     * and height 2 * this.size. 
     */
    renderBody(): void {
        const geometry = new three.BufferGeometry ()
            .setFromPoints ([
                new three.Vector3(0, 0, 0),
                new three.Vector3(this.size, 0, 0),
                new three.Vector3(this.size / 2, this.size * 2, 0),
            ]);
        const material = new three.MeshBasicMaterial ({
            wireframe: false,
            color: this.color
        });
        this.mesh.add(new three.Mesh (geometry, material));
    }

    /**
     * Rotates the boid's mesh based on the angle (in radians)
     * that the velocity forms with the Y-axis
     */
    rotate(): void {
        if (this.velocity.x >= 0)
            this.mesh.rotation.z = 2 * Math.PI - this.velocity.angleTo(new three.Vector3(0, 1, 0));
        else 
            this.mesh.rotation.z = this.velocity.angleTo(new three.Vector3(0, 1, 0));
    }

    /**
     * Returns a vector that (when applied to a boid's acceleration)
     * will push it towards the given target. 
     * 
     * @param target - The position that the boid desires
     * @returns A vector
     */
    seek(target: three.Vector3): three.Vector3 {
        let desired = target
            .clone()
            .sub(this.mesh.position)
            .clampLength(this.minSpeed, this.maxSpeed);

        return desired
            .sub(this.velocity)
            .clampLength(0, this.maxForce);
    }
}

class Prey extends Boid {
    // The radius in which the prey can see
    // It's squared here to save time calculating distances
    visibilityRadiusSq: number = 2.5 * 2.5;
    survivalStrength: number = 1.5;

    constructor (viewportSize: three.Vector2) {

        super(0x79B6EF, 0.03, 0.07, 0.004);

        // Sets a random initial position
        this.mesh.position
            .randomDirection()
            .multiplyScalar(10)
            .clamp(
                new three.Vector3(-viewportSize.x, -viewportSize.y, 0),
                new three.Vector3( viewportSize.x,  viewportSize.y, 0)
            )
            .setZ(0);
    }

    /**
     * Updates the prey's velocity and position. 
     * Resets the acceleration.
     */
    move (): void {

        // Limits the acceleration
        this.acceleration.clampLength(0, 0.1);
        
        // Updates the velocity
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(this.minSpeed, this.maxSpeed);

        // Updates the position
        this.mesh.position.add(this.velocity);
        this.rotate();

        // Updates the acceleration
        this.acceleration.set (0, 0, 0);
    }

    /**
     * Checks if there are any predators within the prey's visibility
     * 
     * @param world - The current world
     * @returns An array of predators
     */
    getVisiblePredators(world: World): Predator[] {
        let predators: Predator[] = [];

        for (const predator of world.predators) {
            const distanceSq = predator.mesh.position.distanceToSquared(this.mesh.position);
            if (distanceSq <= this.visibilityRadiusSq) predators.push(predator);
        }

        return predators;
    }

    /**
     * Inverts the seeking vector for the position of the nearest predator
     * and applies it to the acceleration. In other words it steers the prey
     * away from the predator ignoring everything else.
     * 
     * @param predators - An array containing all the visible predators
     */
    avoidPredator(predators: Predator[]): void {
        this.acceleration.add(
            this.seek(predators[0].mesh.position)
                .multiplyScalar(this.survivalStrength)
                .clampLength(this.maxSpeed, this.maxSpeed)
                .negate()
                .setZ(0)
        );
    }

    /**
     * When a prey get's eaten
     * This doesn't actually remove the boid from the World array, but it makes it invisible
     */
    eat(): void {
        this.mesh.visible = false;
        this.mesh.position.z = 1000;
    }

    separate(boids: Prey[]): void {
        const separationDistanceSq: number = 0.5 * 0.5;
        const separationStrength: number = 1.4;
        
        let sum = new three.Vector3(0, 0, 0);
        let count = 0;
        for (const boid of boids) {
            const distanceSq = boid.mesh.position.distanceToSquared(this.mesh.position);
            if (distanceSq >= 0.01 && distanceSq <= separationDistanceSq) {
                sum.add(
                    this.mesh.position
                        .clone()
                        .sub(boid.mesh.position)
                        .setLength(1 / distanceSq)
                );
                count++;
            }
        }
        
        if (count === 0) return;

        sum
            .setLength(this.maxSpeed)
            .sub(this.velocity)
            .clampLength(0, this.maxForce)
            .multiplyScalar(separationStrength);

        this.acceleration.add(sum)
    }

    align(boids: Prey[]): void {
        const alignmentDistanceSq: number = 1;
        const alignmentStrength: number = 1.2;

        let sum = new three.Vector3(0, 0, 0);
        let count = 0;
        for (const boid of boids) {
            const distanceSq = this.mesh.position.distanceToSquared(boid.mesh.position);
            if (distanceSq >= 0.01 && distanceSq <= alignmentDistanceSq) {
                sum.add(boid.velocity);
                count++;
            }
        }

        if (count === 0) return;

        sum
            .divideScalar(count)
            .setLength(this.maxSpeed)
            .sub(this.velocity)
            .clampLength(0, this.maxForce)
            .multiplyScalar(alignmentStrength);

        this.acceleration.add(sum);
    }

    group(boids: Prey[]): void {
        const cohesionDistanceSq: number = 1;
        const cohesionStrength: number = 0.8;

        let sum = new three.Vector3(0, 0, 0);
        let count = 0;

        for (const boid of boids) {
            const distanceSq = boid.mesh.position.distanceToSquared(this.mesh.position);
            if (distanceSq >= 0.01 && distanceSq <= cohesionDistanceSq) {
                sum.add(boid.mesh.position);
                count++;
            }
        }

        if (count === 0) return;

        sum = this.seek(sum.divideScalar(count))
            .multiplyScalar(cohesionStrength);
    
        this.acceleration.add(sum);
    }

    /**
     * Steers the prey away from the borders of the viewport. 
     * This is to keep it from going offscreen and to add some
     * variability in the group's movement
     * 
     * @param viewportSize - The size of the viewport
     */
    boundaries(viewportSize: three.Vector2): void {
        const margin: number = 1;
        const halfWidth = viewportSize.x / 2;
        const halfHeight = viewportSize.y / 2;

        let desired = null;

        if (this.mesh.position.x > halfWidth - margin) desired = new three.Vector3(-this.maxSpeed, this.velocity.y, 0);
        else if (this.mesh.position.x < margin - halfWidth) desired = new three.Vector3(this.maxSpeed, this.velocity.y, 0);

        if (this.mesh.position.y > halfHeight - margin) desired = new three.Vector3(this.velocity.x, -this.maxSpeed, 0);
        else if (this.mesh.position.y < margin - halfHeight) desired = new three.Vector3(this.velocity.x, this.maxSpeed, 0);

        if (desired) {
            desired
                .normalize()
                .multiplyScalar(this.maxSpeed)
                .sub(this.velocity)
                .clampLength(0, this.maxForce);

            this.acceleration.add(desired);
        }
    }

    /**
     * Updates the prey
     * 
     * @param world - The world
     */
    update (world: World): void {

        // Gets everything visible to the boid
        const predators = this.getVisiblePredators(world);

        // If any predators are present, avoid them at all costs
        if (predators.length > 0) {
            this.avoidPredator(predators);
        }

        // Flock
        this.separate(world.prey);
        this.align(world.prey);
        this.group(world.prey);

        // Keeps the boid within the screen
        this.boundaries(world.viewportSize);
    }

}

// TODO: Fix bugs. Implement pursuit (ex 5.3)
class Predator extends Boid {
    wanderTheta: number = 0.0;
    visibilityAngle: number = 1;
    visibilityRadiusSq: number = 1.5 * 1.5;
    eatingRadiusSq: number = 0.25 * 0.25; 

    constructor () {

        super(0xFF0000, 0.01, 0.07, 0.03);

        // Renders the visibility arc
        this.renderVisibility();

        // Positions the group
        this.mesh.position
            .random()
            .multiplyScalar(10)
            .setZ(0);
    }

    renderVisibility(): void {
        const geometry = new three.BufferGeometry()
            .setFromPoints(
                new three.Path()
                    .absarc(0, 0, Math.sqrt(this.visibilityRadiusSq), -this.visibilityAngle, this.visibilityAngle)
                    .getSpacedPoints(50)
            );
        geometry.rotateZ(Math.PI / 2);        
        const material = new three.LineBasicMaterial ({
            color: this.color
        });
        this.mesh.add(new three.Line(geometry, material));
    }

    teleport(viewportSize: three.Vector2): void {
        const halfWidth = viewportSize.x / 2;
        const halfHeight = viewportSize.y / 2;

        if (this.mesh.position.x > halfWidth) this.mesh.position.x = -halfWidth;
        else if (this.mesh.position.x < -halfWidth) this.mesh.position.x = halfWidth;

        if (this.mesh.position.y > halfHeight) this.mesh.position.y = -halfHeight;
        else if (this.mesh.position.y < -halfHeight) this.mesh.position.y = halfHeight;
    }

    move(viewportSize: three.Vector2): void {

        // Updates the velocity
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(this.minSpeed, this.maxSpeed);
        
        // Updates the position
        this.mesh.position.add(this.velocity);
        this.rotate();        
        this.teleport(viewportSize);

        // Resets the acceleration
        this.acceleration.set(0, 0, 0);
    }

    closestVisibleBoid(boids: Prey[]): Prey | null {
        let closestBoid: Prey | null = null;
        let closestDistanceSq: number = 1_000_000; // Infinity

        for (const boid of boids) {
            if (boid.mesh.position.angleTo(new three.Vector3(0, 1, 0)) > this.visibilityAngle) continue;
            const distanceSq = this.mesh.position.distanceToSquared(boid.mesh.position);

            // If they are within eating distance, eat them
            if (distanceSq <= this.eatingRadiusSq) boid.eat();

            if (distanceSq <= this.visibilityRadiusSq && distanceSq <= closestDistanceSq) {
                closestBoid = boid;
                closestDistanceSq = distanceSq;
            }
        }

        return closestBoid;
    }

    wander(): void {
        let delta = 0.3;
        this.wanderTheta += Math.random() * (delta - (-delta)) + (-delta);

        let circlePos = this.velocity
            .clone()
            .normalize()
            .multiplyScalar(30)
            .add(this.mesh.position);

        const h = this.velocity.angleTo(new three.Vector3(1, 0, 0));

        let circleOff = new three.Vector3(
            2 * Math.cos(this.wanderTheta + h),
            2 * Math.sin(this.wanderTheta + h),
            0
        );

        this.acceleration.add(this.seek(circlePos.add(circleOff)));
    }

    update(world: World): void {

        // Finds the nearest visible boid
        const closestVisibleBoid = this.closestVisibleBoid(world.prey);

        // If any are visible, eat them.
        if (closestVisibleBoid !== null) {
            this.acceleration.add(
                this.seek(closestVisibleBoid.mesh.position)
            );
        } else {
            this.wander();
        }
    }
}

class World {
    prey: Prey[] = [];
    predators: Predator[] = [];
    viewportSize: three.Vector2;
    scene: three.Scene;
    camera: three.PerspectiveCamera;
    renderer: three.WebGLRenderer;

    constructor(n: number, canvas: RefObject<HTMLCanvasElement>) {

        // Creates the renderer
        this.renderer = new three.WebGLRenderer({ canvas: (!canvas.current ? undefined : canvas.current), alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Creates the scene
        this.scene = new three.Scene();
        this.scene.background = null;

        // Creates the camera
        this.camera = new three.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.z = 5;

        // Calculates the viewport size
        const viewportHeight: number = 2 * Math.tan(three.MathUtils.degToRad(this.camera.fov) / 2) * this.camera.position.z;
        this.viewportSize = new three.Vector2(
            viewportHeight * this.camera.aspect,
            viewportHeight
        );

        // Creates the boids
        for (let i = 0; i < n; i++) this.addBoid();
    
        // This is the mouse
        this.addPredator(false);

        // Creates a predator
        this.addPredator();
    }

    addBoid(): void {
        const bird = new Prey(this.viewportSize);
        this.prey.push(bird);
        this.scene.add(bird.mesh);
    }

    addPredator(visible?: boolean): void {
        const predator = new Predator();
        predator.mesh.visible = (typeof visible === "undefined" ? true : visible);

        this.predators.push(predator);
        this.scene.add(predator.mesh);   
    }

    resizeCanvasToDisplaySize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
      
        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }

    update(): void {
        this.resizeCanvasToDisplaySize();

        this.predators[1].update(this);
        this.predators[1].move(this.viewportSize);

        for (const boid of this.prey) { 
            boid.update(this);
            boid.move();
        }

        this.renderer.render(this.scene, this.camera);
    }

    mouseMove(event: MouseEvent): void {
        let v = new three.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 4.9)
            .unproject(this.camera)
            .sub(this.camera.position)
            .normalize();

        const distance = -this.camera.position.z / v.z;

        const {x, y} = this.camera.position
            .clone() 
            .add(v.multiplyScalar(distance));

        this.predators[0].mesh.position.set(x, y, 0);
    }

}

export {
    Prey,
    Predator,
    World,
};