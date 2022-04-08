import { LogicValueExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

export class InExpressionNode<T> extends ExpressionNodeBase<NodeType.In> {
  constructor(
    public readonly value: LogicValueExpression<T>,
    public readonly match: LogicValueExpression<T>[]
  ) {
    super(NodeType.In);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(
      ctx,
      [
        this.value,
        "IN",
        this.format(
          ctx,
          this.match.map((x) => x.build(ctx, this)),
          { separator: ", ", wrap: true }
        ),
      ],
      { separator: " " }
    );
  }
}
