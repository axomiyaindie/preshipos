import { ImageResponse } from "next/og";

interface OgImageProps {
  title: string;
  description: string;
  category?: string;
}

export function createOgImage(
  { title, description, category = "INDIE MAKER PLAYBOOK" }: OgImageProps,
  requestUrl: string,
) {
  const logoUrl = new URL(
    "/branding/logo/logo.png",
    requestUrl,
  ).toString();

  const displayTitle =
    title.length > 85 ? `${title.slice(0, 82)}...` : title;

  const displayDescription =
    description.length > 180
      ? `${description.slice(0, 177)}...`
      : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(ellipse at 85% 10%, #30245c 0%, transparent 45%), linear-gradient(135deg, #090d19 0%, #11182a 55%, #17132b 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "440px",
            height: "440px",
            border: "1px solid rgba(167,139,250,0.16)",
            borderRadius: "50%",
            right: "-110px",
            bottom: "-190px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <img
            src={logoUrl}
            width="64"
            height="64"
            style={{ objectFit: "contain" }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 700 }}>
              PreShipOS
            </span>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "3px",
                color: "#b9a9f5",
                marginTop: "5px",
              }}
            >
              BUILD. LAUNCH. GROW.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(167,139,250,0.35)",
              background: "rgba(139,92,246,0.13)",
              color: "#c4b5fd",
              borderRadius: "999px",
              padding: "9px 17px",
              fontSize: "15px",
              letterSpacing: "2px",
              fontWeight: 600,
            }}
          >
            {category.toUpperCase()}
          </div>

          <div
            style={{
              fontSize: title.length > 55 ? "45px" : "57px",
              lineHeight: 1.12,
              fontWeight: 750,
              letterSpacing: "-2px",
              display: "flex",
              maxWidth: "1000px",
            }}
          >
            {displayTitle}
          </div>

          <div
            style={{
              fontSize: "23px",
              lineHeight: 1.5,
              color: "#b7c0d2",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {displayDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.13)",
            paddingTop: "20px",
            color: "#8995aa",
            fontSize: "16px",
          }}
        >
          <span>Made for independent builders.</span>
          <span style={{ color: "#c4b5fd", fontWeight: 600 }}>
            PreShipOS
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
