import { lintMissingConstraints } from "@reflect.bridged.xyz/linter/lib/structure.lint/constraints.lint";
import lintNamingConventions from "@reflect.bridged.xyz/linter/lib/naming.lint";
import { detect } from "@reflect.bridged.xyz/detection/lib";
import { ReflectLintFeedback } from "@reflect.bridged.xyz/linter/lib/feedbacks";
import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";

export class Linter {
  constructor(config?) {}

  /**
   * run lints on target node
   * @param node target node
   */
  runLintsOn(node: ReflectSceneNode): Array<ReflectLintFeedback> {
    // reject if selected node is too big for it's size or child count.
    if (node.width > 3000) {
      throw `node "${node.name}" too big for running linter on.`;
    }

    const feedbacks: Array<ReflectLintFeedback> = [];

    const constraintsWarnings = lintMissingConstraints(node);
    if (Array.isArray(constraintsWarnings)) {
      feedbacks.push(...constraintsWarnings);
    }

    const namingFeedbacks = lintNamingConventions(node);
    if (Array.isArray(namingFeedbacks)) {
      feedbacks.push(...namingFeedbacks);
    }

    // test
    const detected = detect(node);
    console.warn("detected", detected);
    // test

    return feedbacks;
  }
}
