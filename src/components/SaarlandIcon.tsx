import React from "react";

interface SaarlandIconProps {
  partial?: boolean;
  opacity?: number;
}

const saarlandCoords: [number, number][] = [
  [7.037960052490462, 49.64337921142578],
  [7.21724987030035, 49.572399139404354],
  [7.273407936096191, 49.592769622802734],
  [7.282810211181641, 49.54483032226568],
  [7.311830043792895, 49.54196929931646],
  [7.28526878356945, 49.5115509033206],
  [7.310669898986873, 49.47896957397484],
  [7.256089210510481, 49.440269470214844],
  [7.293569087982291, 49.397098541259766],
  [7.409649848938159, 49.37794876098644],
  [7.38636922836298, 49.29275131225603],
  [7.292399883270207, 49.24573135375988],
  [7.362774372100944, 49.14517593383812],
  [7.198331832885685, 49.115177154541186],
  [7.098150730133057, 49.15433120727562],
  [7.05802440643339, 49.112586975097656],
  [7.033706188201904, 49.18826293945324],
  [6.924295425415323, 49.223075866699276],
  [6.840444087982178, 49.21423339843767],
  [6.860935211181641, 49.178627014160384],
  [6.834462642669791, 49.15137863159197],
  [6.737987518311002, 49.16456985473633],
  [6.66784572601324, 49.280437469482536],
  [6.565380573272705, 49.34928894042969],
  [6.599329471588362, 49.36661911010765],
  [6.53541898727417, 49.434162139892635],
  [6.431842803955135, 49.474460601806754],
  [6.35482120513916, 49.464984893799],
  [6.371419906616268, 49.548011779785156],
  [6.608709812164477, 49.52021026611328],
  [6.939819812774772, 49.63912200927746],
  [7.037960052490462, 49.64337921142578],
];

const SaarlandIcon: React.FC<SaarlandIconProps> = ({
  partial = false,
  opacity = 1,
}) => {
  const createSVGPath = () => {
    const lons = saarlandCoords.map((coord) => coord[0]);
    const lats = saarlandCoords.map((coord) => coord[1]);

    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;

    // SVG-Dimensions
    const width = 50;
    const height = 60;
    const padding = 2;

    const points = saarlandCoords.map((coord, index) => {
      const lon = coord[0];
      const lat = coord[1];

      const x = ((lon - minLon) / lonRange) * (width - 2 * padding) + padding;
      const y = ((maxLat - lat) / latRange) * (height - 2 * padding) + padding;

      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    });

    return points.join(" ") + " Z";
  };

  const pathData = createSVGPath();
  const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      viewBox="0 0 50 60"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-16 md:w-16 md:h-20"
    >
      {partial && (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="50" height={60 * opacity} />
          </clipPath>
        </defs>
      )}
      <path
        d={pathData}
        fill="#000"
        stroke="none"
        clipPath={partial ? `url(#${clipId})` : undefined}
      />
      {partial && (
        <path
          d={pathData}
          fill="none"
          stroke="#000"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          opacity="0.3"
        />
      )}
    </svg>
  );
};

export default SaarlandIcon;
