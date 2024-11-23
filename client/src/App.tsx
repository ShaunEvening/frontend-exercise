import { Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./theme/vars.css";

function App() {
  return (
    <RadixTheme
      accentColor="purple"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
      radius="medium"
    ></RadixTheme>
  );
}

export default App;
