import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "What a Decade Inside Government Taught Me About AI Adoption";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e0e0d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#c15f3c",
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.15em",
            color: "#c15f3c",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "#c15f3c",
            }}
          />
          A Perspective From Inside Government
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 300,
            color: "#e8e6dc",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          What a Decade Inside Government Agencies{" "}
          <span style={{ color: "#c15f3c", fontStyle: "italic" }}>
            Taught Me About AI Adoption
          </span>
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: "16px",
            color: "#5a5850",
            marginTop: "40px",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          Ryan McCormack
        </div>

        {/* Geometric accent in corner */}
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "60px",
            width: "80px",
            height: "80px",
            border: "1px solid #2a2a28",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "72px",
            bottom: "72px",
            width: "56px",
            height: "56px",
            border: "1px solid #3a3a37",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
