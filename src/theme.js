import {extendTheme, theme as base} from "@chakra-ui/react";

/*
Brand colors created with help from:
https://www.hyperthe.me/
Used an image color picker, to pick the yellow-like collor from my avatar,
and used hypertheme to create color variations.
 */
const colors = {
    brand: {
        "50": "#fbfaf1",
        "100": "#f1edc8",
        "200": "#ece7b4",
        "300": "#e7e0a0",
        "400": "#e1d98c",
        "500": "rgba(215,204,99,255)",
        "600": "#cdbf3a",
        "700": "#bdb030",
        "800": "#a99d2b",
        "900": "#807721"
    },
    template: {
        "bgLight" : "#fff",
        "bgDark": "#161515",
        "textLight": "#000",
        "textDark": "#fff",
    }
};

const customTheme = extendTheme(
    {
        config: {
            initialColorMode: 'light',
            useSystemColorMode: false,
        },
        colors: {...colors},
        fonts: {
            // heading: `Montserrat, ${base.fonts?.heading}`,
            // body: `Inter, ${base.fonts?.body}`,
            body: "var(--fontFamily)",
            heading: "var(--fontFamily)",
        },
        styles: {
            global: ({colorMode}) => ({
                ":root": {
                    "--headerBg": colorMode === "light" ? "rgba(255, 255, 255, 0.6)": "rgba(22, 21, 21, 0.6)",
                },
                // styles for the `body`
                body: {
                    bg: colorMode === "light" ? "template.bgLight" : "template.bgDark",
                    color: colorMode === "light" ? "template.textLight" : "template.textDark",
                },
                // styles for the `a`
                a: {
                    color: "red",
                    _hover: {
                        textDecoration: "none",
                    },
                }
            }),
        },
        components: {
            Link: {
                baseStyle: ({colorMode}) => ({
                    color: colorMode === "light" ? "#000" : "brand.300",
                    _hover: {
                        textDecoration: "none",
                    },
                })
            }
        }
    }
)

export default customTheme;