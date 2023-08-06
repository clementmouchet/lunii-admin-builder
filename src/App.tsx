import { Box, Flex, Space, Title } from "@mantine/core";
import { useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Header } from "./components/Header";
import { MetadataCard } from "./components/MetadataCard";
import { Option } from "./components/Option";
import { state$ } from "./store";
import { cleanAllUnusedAssets } from "./utils";

function App() {
  const initialOption = state$.state.initialOption.use();

  useEffect(() => {
    state$.ui.redrawArrow.set(state$.ui.redrawArrow.peek() + 1);
  }, [initialOption]);

  return (
    <TransformWrapper
      doubleClick={{ disabled: true }}
      panning={{ excluded: ["input", "textarea"] }}
      centerOnInit={false}
      minScale={0.5}
      onZoomStop={({ state: { scale } }) => {
        state$.ui.scale.set(scale);
      }}
    >
      <TransformComponent
        wrapperStyle={{
          height: "100vh",
          width: "100vw",
          cursor: "grab",
        }}
        contentStyle={{
          background: "white",
          backgroundImage: "radial-gradient(black 1px, transparent 0)",
          backgroundSize: "40px 40px",
          backgroundPosition: "-19px -19px",
          minHeight: "100vh",
          minWidth: "100vw",
          padding: "100px",
          boxSizing: "border-box",
        }}
      >
        <Box id="arrrow-frame" pos="relative">
          <Title size={70}>Lunii Admin Builder</Title>
          <Header />
          <Space h={50} />
          <Flex>
            <Box mr={50}>
              <MetadataCard />
            </Box>
            <Option
              option={initialOption}
              id="option-main"
              onUpdate={async (option) => {
                state$.state.initialOption.set(option);
                cleanAllUnusedAssets(option);
              }}
            />
          </Flex>
        </Box>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default App;