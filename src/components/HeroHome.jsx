// src/components/hero/HeroHome.jsx
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroHome() {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                mt: { xs: 3 },
                opacity: 0,
                animation: "fadeIn 1s forwards",
                "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                }
            }}
        >
            {/* Hero Block */}
            <Box
                sx={{
                    position: "relative",
                    minHeight: { xs: "60vh", md: "80vh" },
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    backgroundImage:"linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25)), url('public/HeroHome.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 4,
                    overflow: "hidden",
                    px: { xs: 3, md: 6 },
                    // py: { xs: 6, md: 10 },
                }}
            >
                {/* TEXT BOX */}
                <Box
                    sx={{
                        maxWidth: { xs: "100%", md: 520 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                        transform: "translateY(30px)",
                        opacity: 0,
                        animation: "slideUp 1s 0.4s forwards",
                        "@keyframes slideUp": {
                            from: { opacity: 0, transform: "translateY(30px)" },
                            to: { opacity: 1, transform: "translateY(0)" }
                        }
                    }}
                >
                    {/* New Collection Tag */}
                    <Box
                        sx={{
                            backgroundColor: "var(--primary-color)",
                            color: "white",
                            borderRadius: "999px",
                            padding: "6px 14px",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            width: "fit-content",
                            letterSpacing: "2px",
                        }}
                    >
                        {t("New Collection")}
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "2.2rem", md: "3rem" },
                        }}
                    >
                        {t("Elevate Your Style")} 
                    </Typography>
                     <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            lineHeight: 1.8,
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        {t("Hero Description")}
                    </Typography>

                    {/* BUTTONS */}
                    <Box
                        sx={{
                            mt: 2.5,
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            opacity: 0,
                            animation: "fadeButtons 1s 0.8s forwards",
                            "@keyframes fadeButtons": {
                                from: { opacity: 0 },
                                to: { opacity: 1 }
                            }
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to="/products"
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 1.2,
                                borderRadius: 999,
                                fontWeight: 600,
                                backgroundColor: "var(--primary-color)",
                                color: "#fff",
                                textTransform: "none",
                                position: "relative",
                                overflow: "hidden",

                                // Hover
                                "&:hover": {
                                    backgroundColor: "var(--primary-color-dark)",
                                    boxShadow: "0 0 20px rgba(175, 179, 180, 0.7)",
                                },

                                // Glow Animation
                                animation: "pulseGlow 2.2s infinite ease-in-out",

                                "@keyframes pulseGlow": {
                                    "0%": {
                                        boxShadow: "0 0 0px rgba(175, 179, 180, 0.0)",
                                    },
                                    "50%": {
                                        boxShadow: "0 0 18px rgba(175, 179, 180, 0.7)",
                                    },
                                    "100%": {
                                        boxShadow: "0 0 0px rgba(175, 179, 180, 0.0)",
                                    },
                                },
                            }}
                        >
                            {t("Shop Now")} 
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
