import * as React from "react";
import "./formBlocks.scss";
import type { PropsWithChildren } from "react";

/**
 * Returns a full width container with all children components.
 * @param {*} children
 *
 */

export const FormBlock = ({ children }: PropsWithChildren) => {
  return <div className="form-block">{children}</div>;
};

/**
 * Returns a half width container with all children components.
 * @param {*} children
 *
 */
export const FormBlock50 = ({ children }: PropsWithChildren) => {
  return <div className="form-block-50">{children}</div>;
};

/**
 * Wrapper component for all form contents.
 * This component places all nested components next to each other.
 * @param {*} children
 *
 */

export const FormFlex = ({ children }: PropsWithChildren) => {
  return <div className="form-flex">{children}</div>;
};
