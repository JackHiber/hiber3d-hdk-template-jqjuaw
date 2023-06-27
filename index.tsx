import {
  HDKComponent,
  HNode,
  Prefab,
  render,
  Animation,
  InfoPanel,
  GLB,
} from "@hiber3d/hdk-react";
import { AnimateAlongPath, InCircle, Mesh, Spinning } from "@hiber3d/hdk-react-components";

/**
 * Create a ground to stand on
 *
 * 1. Use a prefab which a premade object with specific properties like materials and shape.
 * 2. Scale it up so that the player can stand on it
 * 3. Add some mist to it
 * 4. Add it to the world
 */

const Ground = () => (
  <Prefab id="smooth_rock_cylinder_02" scaleX={3} scaleY={0.88} scaleZ={3}>
    <Prefab id="fx_particlesystem_mist_01" />
  </Prefab>
);

/**
 * Add some water to the world. Here we use "HDKComponent" to pass through useful properties.
 */
const Water: HDKComponent = (props) => (
  <HNode {...props}>
    <Prefab id="water_plane_01" scaleX={200} scaleZ={200} />
    <Prefab id="large_sand_plane_01" y={-0.4} />
  </HNode>
);

/**
 * Add a floating island with some shrubbery, a waterfall and an animated platform.
 * The platform is constructed as an animated group, to illustrate using a wall as
 * a platform by rotating it 90 degrees without having to counter-rotate the animation.
 */
const Platform = () => (
  <Animation animation={{ x: [-6, 0], y: [-9, 0], duration: 4 }}>
    <Prefab id="en_m_wooden_platform_01_wall" z={3} rotX={90} />
  </Animation>
);

const Island: HDKComponent = (props) => (
  <Prefab id="smooth_rock_cylinder_02" {...props}>
    <Prefab id="fx_particlesystem_waterfall_01" x={-3.9} y={1.9} />
    <Prefab id="grass_tuft_02_cluster" x={-3} y={1.5} z={1} />
    <Prefab id="cherry_tree_01" y={2.8} />
    <Platform />
    <Prefab id="goal_01" x={3} y={2} z={-2} material="palette_02_gold" />
    <Prefab id="particle_jar_of_fireflies_01" />
  </Prefab>
);

/**
 * Add a sign component. In addition to the normal props, it accepts some extra sign-related ones.
 */
const Sign: HDKComponent<{ header: string; body: string; url: string }> = ({
  ...props
}) => (
  <InfoPanel {...props} openUrlInNewTab>
    <Prefab id="sign_wooden_01_exclamtion" rotY={-80} />
  </InfoPanel>
);

/**
 * Add a circle of cliffs in the horizon using the addMany helper method
 */
const Wall = () => {
  return (
    <InCircle
      faceCenter
      radius={90}
      items={10}
      renderItem={() => (
        <Prefab id="cliff_01_wall" rotY={90} scale={4} y={-10} />
      )}
    />
  );
};

/**
 * Add a spawn point with a custom material
 */
const SpawnPoint: HDKComponent = (props) => (
  <Prefab id="gpl_spawn_point_01" material="t_pearl_01" {...props} />
);

/**
 * Create a world
 */
const World = () => (
  <HNode y={-1}>
    <Ground />
    <Water y={-1} />
    <Island x={20} y={10} />
    <Sign
      header="Welcome to Hiber3D HDK!"
      body="This is The Getting Started world. Press O to learn how to build it!"
      url="https://developer.hiber3d.com/docs/getting-started/rendering-a-scene"
      x={-3}
      y={2} />
      <AnimateAlongPath duration={10} points={[[5,0,0], [5,5,5], [10,10,10], [9,4,2], [4,2,1], [13,13,13], [20,20,17], [13,13,13], [4,2,1]]}>
      <Spinning>
      <Mesh y={4} id="en_p_car_01" material="palette_01_cerulean" physical/></Spinning>
      </AnimateAlongPath>
      <GLB z={4} y={1.75} rotY={270} src="https://uploadthing.com/f/edc77129-b741-4eff-a509-6e0d21647de0_1.glb" />
    <SpawnPoint rotY={-80} y={1} x={-10} z={4} />
    <GLB z={4} x={8} y={1.75} scale={0.01} src="https://uploadthing.com/f/f3fd2b98-23ca-43be-bab2-521b35ae116e_toyota_4runner_mk4_stock.glb"/>
    <GLB z={7} x={-4} y={1} src="https://uploadthing.com/f/f3a7d1ab-a316-472a-a220-a3df9de21bb1_cyber.glb"  />
    <GLB z={3} x={5} y={11} scale={0.10} src="https://uploadthing.com/f/7a66d8e9-7a64-4a6f-b542-1b0bdac0e7ee_Suzuki%20s1.glb" />
  </HNode>
);

/**
 * Render the scene
 */
render(<World />, { environment: "sunrise_01" });