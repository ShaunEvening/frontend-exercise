import { Theme } from "@radix-ui/themes";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      accentColor="purple"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
      radius="medium"
    >
      {children}
    </Theme>
  );
};
