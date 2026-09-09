import type React from "react";
import { Fragment } from "react";

export const RenderBlocks: React.FC<{
  blocks?: any[];
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {blocks.map((block, index) => (
        <div className="my-12" key={index}>
          {block.title && <h3 className="text-xl font-bold">{block.title}</h3>}
          {block.description && <p className="text-zinc-400">{block.description}</p>}
        </div>
      ))}
    </Fragment>
  );
};
