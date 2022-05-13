import React from "react";

import { UserContext } from "./state";

export const Headings = () => {
  const [state] = React.useContext(UserContext);

  return (
    state.headingList &&
    (state.headingList.length > 0 ? (
      state.headingList.map((heading) => {
        const style = {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        };
        style.paddingLeft = heading.attrs.level - 1.5 + "rem";
        return (
          heading.content && <p style={style}>{heading.content[0].text}</p>
        );
        // switch (heading.attrs.level) {
        //   case 1:
        //     return (
        //       heading.content && <p style={style}>{heading.content[0].text}</p>
        //     );
        //   case 2:
        //     return (
        //       heading.content && <p style={style}>{heading.content[0].text}</p>
        //     );
        //   case 3:
        //     return (
        //       heading.content && <p style={style}>{heading.content[0].text}</p>
        //     );
        //   case 4:
        //     return (
        //       heading.content && <p style={style}>{heading.content[0].text}</p>
        //     );
        //   case 5:
        //     return (
        //       heading.content && <p style={style}>{heading.content[0].text}</p>
        //     );
        //   default:
        //     return heading.content && <p>{heading.content[0].text}</p>;
        // }
      })
    ) : (
      <p style={{ textAlign: "center", color: "#919191" }}>
        输入标题后展示目录树
      </p>
    ))
  );
};
