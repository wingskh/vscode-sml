// tslint:disable object-literal-sort-keys

import { grammar as schema } from "../../schema";

export const Cls = {
  alnum: `[:alnum:]`,
  alpha: `[:alpha:]`,
  ascii: `[:ascii:]`,
  blank: `[:blank:]`,
  cntrl: `[:cntrl:]`,
  digit: `[:digit:]`,
  graph: `[:graph:]`,
  lower: `[:lower:]`,
  print: `[:print:]`,
  punct: `[:punct:]`,
  space: `[:space:]`,
  upper: `[:upper:]`,
  word: `[:word:]`,
  xdigit: `[:xdigit:]`,
};

export const Kwd = {
  ABSTYPE: `abstype`,
  AND: `and`,
  ANDALSO: `andalso`,
  AS: `as`,
  CASE: `case`,
  DATATYPE: `datatype`,
  DO: `do`,
  ELSE: `else`,
  END: `end`,
  EQTYPE: `eqtype`,
  EXCEPTION: `exception`,
  FALSE: `false`,
  FN: `fn`,
  FUN: `fun`,
  FUNCTOR: `functor`,
  HANDLE: `handle`,
  IF: `if`,
  IN: `in`,
  INFIX: `infix`,
  INFIXR: `infixr`,
  INCLUDE: `include`,
  LET: `let`,
  LOCAL: `local`,
  NONFIX: `nonfix`,
  OF: `of`,
  OP: `op`,
  OPEN: `open`,
  ORELSE: `orelse`,
  RAISE: `raise`,
  REC: `rec`,
  SHARING: `sharing`,
  SIG: `sig`,
  SIGNATURE: `signature`,
  STRUCT: `struct`,
  STRUCTURE: `structure`,
  THEN: `then`,
  TRUE: `true`,
  TYPE: `type`,
  VAL: `val`,
  WHERE: `where`,
  WHILE: `while`,
  WITH: `with`,
  WITHTYPE: `withtype`,
};

const decStart = [
  Kwd.ABSTYPE,
  Kwd.AND,
  Kwd.DATATYPE,
  Kwd.EXCEPTION,
  Kwd.FUN,
  Kwd.INFIX,
  Kwd.INFIXR,
  Kwd.LOCAL,
  Kwd.NONFIX,
  Kwd.OPEN,
  Kwd.TYPE,
  Kwd.VAL,
];

const decEnd = [
  ...decStart,
  Kwd.END,
  Kwd.IN,
];

const topdecStart = [
  ...decStart,
  Kwd.INCLUDE,
  Kwd.LOCAL,
  Kwd.FUNCTOR,
  Kwd.SIGNATURE,
  Kwd.STRUCTURE,
];

const topdecEnd = [
  ...topdecStart,
  Kwd.END,
  Kwd.IN,
];

export const TokSet = {
  decEnd,
  decStart,
  operator: [":", "!", "?", "'", "@", "/", "\\-", "\\*", "\\\\", "\\+", "\\|", "&", "#", "%", "`", "^", "<", "=", ">", "~", "$" ],
  topdecEnd,
  topdecStart,
};

export const alt = (...rest: string[]) => rest.join("|");
export const capture = (arg: string) => `(${arg})`;
export const complement = (...rest: string[]) => `[^${rest.join("")}]`;
export const group = (arg: string) => `(?:${arg})`;
export const lookBehind = (arg: string) => `(?<=${arg})`;
export const negativeLookBehind = (arg: string) => `(?<!${arg})`;
export function lastOps(...rest: string[]): string {
  const result: string[] = [];
  for (const token of rest) result.push(`[^${seq(...TokSet.operator)}]${token}`, `^${token}`);
  return alt(...result);
}
export function lastWords(...rest: string[]): string {
  const result: string[] = [];
  for (const token of rest) result.push(`[^[:word:]]${token}`, `^${token}`);
  return alt(...result);
}
export const many = (arg: string) => `${arg}*`;
export const manyOne = (arg: string) => `${arg}+`;
export const opt = (arg: string) => `${arg}?`;
export const words = (arg: string) => `\\b${arg}\\b`;
export const ops = (arg: string) => seq(lookBehind(complement(...TokSet.operator)), arg, lookAhead(complement(...TokSet.operator)));
export const lookAhead = (arg: string) => `(?=${arg})`;
export const negativeLookAhead = (arg: string) => `(?!=${arg})`;
export const seq = (...rest: string[]) => rest.join("");
export const set = (...rest: string[]) => `[${rest.join("")}]`;

export const Gph = {
  APOSTROPHE: `'`,
  ASTERISK: `\\*`,
  COLON: `:`,
  COMMA: `,`,
  EQUALS_SIGN: `=`,
  ELLIPSIS: `\\.\\.\\.`,
  FULL_STOP: `\\.`,
  GREATER_THAN_SIGN: `>`,
  HYPHEN_MINUS: `-`,
  LEFT_CURLY_BRACKET: `\\{`,
  LEFT_PARENTHESIS: `\\(`,
  LEFT_SQUARE_BRACKET: `\\[`,
  LOW_LINE: `_`,
  NUMBER_SIGN: `#`,
  RIGHT_CURLY_BRACKET: `\\}`,
  RIGHT_PARENTHESIS: `\\)`,
  RIGHT_SQUARE_BRACKET: `\\]`,
  QUOTATION_MARK: `"`,
  SEMICOLON: `;`,
  VERTICAL_LINE: `\\|`,
};

export const Rx = {
  boundary: `\\b`,
  expEnd:
    lookAhead(
      alt(
        Gph.COMMA,
        Gph.RIGHT_CURLY_BRACKET,
        Gph.RIGHT_PARENTHESIS,
        Gph.RIGHT_SQUARE_BRACKET,
        seq(
          words(group(alt(...TokSet.topdecEnd))),
          group(
            alt(
              "$",
              set(Cls.space),
              ops(
                alt(
                  Gph.COMMA,
                  Gph.RIGHT_CURLY_BRACKET,
                  Gph.RIGHT_PARENTHESIS,
                  Gph.RIGHT_SQUARE_BRACKET))))))),
topdecEndSansType:
    lookAhead(
      alt(
        Gph.RIGHT_CURLY_BRACKET,
        Gph.RIGHT_PARENTHESIS,
        Gph.RIGHT_SQUARE_BRACKET,
        seq(
          words(group(alt(...TokSet.topdecEnd.filter((x) => x !== Kwd.TYPE) ))),
          group(
            alt(
              "$",
              set(Cls.space),
              ops(
                alt(
                  Gph.RIGHT_CURLY_BRACKET,
                  Gph.RIGHT_PARENTHESIS,
                  Gph.RIGHT_SQUARE_BRACKET))))))),
  topdecEnd:
    lookAhead(
      alt(
        Gph.RIGHT_CURLY_BRACKET,
        Gph.RIGHT_PARENTHESIS,
        Gph.RIGHT_SQUARE_BRACKET,
        seq(
          words(group(alt(...TokSet.topdecEnd))),
          group(
            alt(
              "$",
              set(Cls.space),
              ops(
                alt(
                  Gph.RIGHT_CURLY_BRACKET,
                  Gph.RIGHT_PARENTHESIS,
                  Gph.RIGHT_SQUARE_BRACKET))))))),
};

export const operator: string =
  seq(
    set(Cls.alpha),
    many(set(...TokSet.operator)),
    group(alt("\\b", lookAhead(set(Cls.space)))));

export const identifier: string =
  seq(
    set(Cls.alpha),
    many(set(Cls.alnum, "'", "_")),
    group(alt("\\b", lookAhead(set(Cls.space)))));

export const Lex = {
  operator:
    seq(
      negativeLookAhead(ops(alt(Gph.VERTICAL_LINE))),
      manyOne(set(...TokSet.operator))),
  tyvar:
    seq(
      negativeLookAhead(words(group(alt(...Object.keys(Kwd).map((key) => Kwd[key]))))),
      seq(capture(Gph.APOSTROPHE), capture(identifier))),
  vid:
    seq(
      negativeLookAhead(words(group(alt(...Object.keys(Kwd).map((key) => Kwd[key]))))),
      seq("\\b", identifier)),
};

export const Sco = {
  AND: `variable.other.class.js variable.interpolation storage.modifier message.error`,
  APOSTROPHE: `punctuation.definition.tag`,
  CASE: `keyword.control.switch`,
  COLON: `variable.other.class.js variable.interpolation keyword.operator keyword.control message.error`,
  COMMA: `string.regexp`,
  COMMENT: `comment`,
  CONSTRUCTOR: `entity.other.attribute-name.css constant.language constant.numeric`,
  DELIMITER: `punctuation.definition.tag`,
  DOT: `keyword`,
  FIELD_NAME: `markup.inserted constant.language support.property-value entity.name.filename`,
  FIXITY: `keyword.control`,
  FUN: `storage.type`,
  FUNCTION_NAME: `entity.name.function`,
  FUNCTOR: `variable.other.class.js variable.interpolation keyword.operator keyword.control message.error`,
  INCLUDE: `keyword.control.include`,
  KEYWORD: `keyword`,
  LET: `keyword.control`,
  LOCAL: `keyword.control`,
  MODULE_NAME: `entity.name.class constant.numeric`,
  NUMBER: `constant.numeric`,
  OPEN: `keyword.control.open`,
  OPERATOR: `variable.other.class.js message.error variable.interpolation string.regexp`,
  PATTERN_VARIABLE: `string.other.link variable.language variable.parameter`,
  PUNCTUATION: `string.regexp`,
  RAISE: `keyword.control.throwcatch`,
  REC: `variable.other.class.js variable.interpolation keyword.operator keyword.control message.error`,
  SIG: `variable.other.class.js variable.interpolation keyword.control storage.type message.error`,
  SIGNATURE: `variable.other.class.js variable.interpolation keyword.control storage.type message.error`,
  STRING: `string.double`,
  STRUCTURE: `variable.other.class.js variable.interpolation keyword.control storage.type message.error`,
  STRUCT: `variable.other.class.js variable.interpolation keyword.control storage.type message.error`,
  TYPE_CONSTRUCTOR: `support.type`,
  TYPE_NAME: `entity.name.function`,
  TYPE_OPERATOR: `markup.inserted string.regexp`,
  TYPE_VARIABLE: `variable.parameter string.other.link variable.language`,
  VAL: `storage.type`,
  VERTICAL_LINE: `keyword.control.switch`,
};

export const appexp: schema.Rule = {
  patterns: [
    { include: `#atexp` },
  ],
};

export const atexp: schema.Rule = {
  patterns: [
    { include: `#comment` },
    { include: `#scon` },
    { include: `#constant` },
    {
      // FIXME: end
      begin: ops(Gph.NUMBER_SIGN),
      end: alt(capture(Lex.vid), lookBehind(set(Cls.digit, Gph.QUOTATION_MARK))),
      beginCaptures: {
        0: { name: Sco.OPERATOR },
      },
      endCaptures: {
        1: { name: Sco.FIELD_NAME },
      },
      patterns: [
        { include: `#constantNumber` },
        { include: `#constantString` },
      ],
    },
    {
      begin: words(Kwd.LET),
      end: lookBehind(lastWords(Kwd.END)),
      captures: {
        0: { name: Sco.LET },
      },
      patterns: [
        {
          begin: lookBehind(lastWords(Kwd.LET)),
          end: words(Kwd.IN),
          endCaptures: {
            0: { name: Sco.LET },
          },
          patterns: [
            { include: `#dec` },
          ],
        },
        {
          begin: lookBehind(lastWords(Kwd.IN)),
          end: words(Kwd.END),
          endCaptures: {
            0: { name: Sco.LET },
          },
          patterns: [
            { include: `#exp` },
          ],
        },
      ],
    },
    {
      begin: Gph.LEFT_CURLY_BRACKET,
      end: Gph.RIGHT_CURLY_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
    {
      begin: seq(Gph.LEFT_PARENTHESIS, negativeLookAhead(Gph.RIGHT_PARENTHESIS)),
      end: Gph.RIGHT_PARENTHESIS,
      captures: {
        0: { name: Sco.DELIMITER },
      },
      patterns: [
        {
          begin: ops(Gph.COLON),
          end: lookAhead(Gph.RIGHT_PARENTHESIS),
          beginCaptures: {
            0: { name: Sco.COLON },
          },
          patterns: [
            { include: `#ty` },
          ],
        },
        { include: `#exp` },
      ],
    },
  ],
};

export const atpat: schema.Rule = {
  patterns: [],
};

export const comment: schema.Rule = {
  begin: seq(Gph.LEFT_PARENTHESIS, Gph.ASTERISK),
  end: seq(Gph.ASTERISK, Gph.RIGHT_PARENTHESIS),
  name: Sco.COMMENT,
  patterns: [
    { include: `#comment` },
  ],
};

export const conbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(alt(lastWords(Kwd.EXCEPTION), lastOps(Gph.EQUALS_SIGN, Gph.VERTICAL_LINE))),
      end:
        alt(
          capture(words(Kwd.OF)),
          capture(ops(Gph.VERTICAL_LINE)),
          Rx.topdecEnd),
      endCaptures: {
        1: { name: Sco.CASE },
        2: { name: Sco.VERTICAL_LINE },
      },
      patterns: [
        { include: `#comment` },
        {
          match: alt(Lex.operator, Lex.vid),
          name: Sco.CONSTRUCTOR,
        },
      ],
    },
    {
      begin: lookBehind(lastWords(Kwd.OF)),
      end: alt(ops(Gph.VERTICAL_LINE), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.VERTICAL_LINE },
      },
      patterns: [
        { include: `#comment` },
        { include: `#ty` },
      ],
    },
  ],
};

export const condesc: schema.Rule = {
  patterns: [],
};

export const constant: schema.Rule = {
  patterns: [
    { include: `#constantNumber` },
    { include: `#constantString` },
    {
      match: words(alt(Kwd.FALSE, Kwd.TRUE)),
      name: Sco.CONSTRUCTOR,
    },
    { include: `#qualifiedConstant` },
    {
      match: seq(Gph.LEFT_PARENTHESIS, Gph.RIGHT_PARENTHESIS),
      name: Sco.CONSTRUCTOR,
    },
    {
      match: seq(Gph.LEFT_SQUARE_BRACKET, Gph.RIGHT_SQUARE_BRACKET),
      name: Sco.CONSTRUCTOR,
    },
    {
      begin: Gph.LEFT_CURLY_BRACKET,
      end: Gph.RIGHT_CURLY_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#row` },
      ],
    },
    {
      begin: Gph.LEFT_SQUARE_BRACKET,
      end: Gph.RIGHT_SQUARE_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
  ],
};

export const constantNumber: schema.Rule = {
  match:
  seq(
    negativeLookBehind(set(Cls.alpha)),
    seq(
      set(Cls.digit),
      many(set(Cls.digit))),
    opt(
      capture(
        seq(
          Gph.FULL_STOP,
          set(Cls.digit),
          many(set(Cls.digit)))))),
  name: Sco.NUMBER,
};

export const constantString: schema.Rule = {
  begin: `"`,
  end: `"`,
  name: Sco.STRING,
  patterns: [
    { match: `\\\\"` },
  ],
};

export const datbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(lastWords(Kwd.ABSTYPE, Kwd.AND, Kwd.DATATYPE)),
      end: ops(Gph.EQUALS_SIGN),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        {
          match: Lex.vid,
          name: Sco.TYPE_NAME,
        },
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(words(Kwd.AND), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.AND },
      },
      patterns: [
        { include: `#conbind` },
      ],
    },
  ],
};

export const datdesc: schema.Rule = {
  patterns: [],
};

export const dec: schema.Rule = {
  patterns: [
    {
      begin: words(Kwd.ABSTYPE),
      end: words(Kwd.END),
      captures: {
        0: { name: Sco.KEYWORD },
      },
    },
    { include: `#decDatatype` },
    { include: `#decException` },
    {
      begin: words(Kwd.FUN),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.FUN },
      },
      patterns: [
        { include: `#fvalbind` },
      ],
    },
    {
      begin: words(group(alt(Kwd.INFIX, Kwd.INFIXR, Kwd.NONFIX))),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.FIXITY },
      },
      patterns: [
        {
          // FIXME
          match: Lex.operator,
          name: Sco.OPERATOR,
        },
      ],
    },
    {
      begin: words(Kwd.OPEN),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.OPEN },
      },
      patterns: [
        { include: `#qualifiedModule` },
      ],
    },
    { include: `#decType` },
    { include: `#decVal` },
  ],
};

export const decDatatype: schema.Rule = {
  patterns: [
    {
      begin: words(Kwd.DATATYPE),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#datbind` },
      ],
    },
  ],
};

export const decException: schema.Rule = {
  patterns: [
    {
      begin: words(Kwd.EXCEPTION),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#comment` },
        { include: `#conbind` },
      ],
    },
  ],
};

export const decType: schema.Rule = {
  patterns: [
    {
      begin: words(Kwd.TYPE),
      end: alt(Rx.topdecEnd, lookAhead(alt(words(Kwd.WHERE), Gph.EQUALS_SIGN))),
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#typbind` },
      ],
    },
  ],
};

export const decVal: schema.Rule = {
  begin: words(Kwd.VAL),
  end: Rx.topdecEnd,
  beginCaptures: {
    0: { name: Sco.VAL },
  },
  patterns: [
    { include: `#valbind` },
  ],
};

export const exbind: schema.Rule = {
  patterns: [],
};

export const exdesc: schema.Rule = {
  patterns: [],
};

export const exp: schema.Rule = {
  patterns: [
    { include: `#atexp` },
    {
      // FIXME
      match: alt(capture(ops(Gph.COMMA)), capture(alt(Gph.SEMICOLON, Lex.operator)), capture(words(Kwd.AS))),
      captures: {
        1: { name: Sco.COMMA },
        2: { name: Sco.OPERATOR },
        3: { name: Sco.KEYWORD },
      },
    },
    {
      begin: words(Kwd.HANDLE),
      end: Rx.expEnd,
      beginCaptures: {
        0: { name: Sco.RAISE },
      },
      patterns: [
        { include: `#match` },
      ],
    },
    {
      match: words(Kwd.RAISE),
      name: Sco.RAISE,
    },
    {
      begin: words(Kwd.FN),
      end: Rx.expEnd,
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#match` },
      ],
    },
    {
      patterns: [
        {
          begin: words(Kwd.CASE),
          end: words(Kwd.OF),
          captures: {
            0: { name: Sco.CASE },
          },
          patterns: [
            { include: `#exp` },
          ],
        },
        {
          begin: lookBehind(lastWords(Kwd.OF)),
          end: Rx.expEnd,
          endCaptures: {
            0: { name: Sco.OPERATOR },
          },
          patterns: [
            { include: `#match` },
          ],
        },
      ],
    },
    {
      match: words(group(alt(Kwd.IF, Kwd.THEN, Kwd.ELSE))),
      name: Sco.KEYWORD,
    },
    {
      match: words(Kwd.ORELSE),
      name: Sco.OPERATOR,
    },
    {
      match: words(Kwd.ANDALSO),
      name: Sco.OPERATOR,
    },
    {
      match: words(group(alt(Kwd.WHILE, Kwd.DO))),
      name: Sco.KEYWORD,
    },
  ],
};

export const funbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(lastWords(Kwd.FUNCTOR, Kwd.AND)),
      end: ops(alt(capture(Gph.COLON), capture(Gph.EQUALS_SIGN))),
      endCaptures: {
        1: { name: Sco.COLON },
        2: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        { include: `#qualifiedModule` },
        {
          begin: Gph.LEFT_PARENTHESIS,
          end: Gph.RIGHT_PARENTHESIS,
          captures: {
            0: { name: Sco.DELIMITER },
          },
          patterns: [
            { include: `#spec` },
            {
              begin: Lex.vid,
              end: ops(Gph.COLON),
              beginCaptures: {
                0: { name: Sco.MODULE_NAME },
              },
              endCaptures: {
                0: { name: Sco.COLON },
              },
            },
            {
              begin: lookBehind(lastOps(Gph.COLON)),
              end: lookAhead(Gph.RIGHT_PARENTHESIS),
              patterns: [
                { include: `#sigexp` },
              ],
            },
          ],
        },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON)),
      end: ops(Gph.EQUALS_SIGN),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#sigexp` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: Rx.topdecEnd,
      endCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#strexp` },
      ],
    },
    {
      begin: lookBehind(lastWords(Kwd.AND)),
      end: Rx.topdecEnd,
      endCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#funbind` },
      ],
    },
  ],
};

export const fundec: schema.Rule = {
  patterns: [
    { include: `#comment` },
    {
      begin: words(Kwd.FUNCTOR),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.FUNCTOR },
      },
      patterns: [
        { include: `#funbind` },
      ],
    },
  ],
};

export const fvalbind: schema.Rule = {
  patterns: [
    {
      begin:
        lookBehind(
          alt(
            lastOps(Gph.VERTICAL_LINE),
            lastWords(Kwd.AND, Kwd.FUN))),
      end: ops(alt(capture(Gph.COLON), capture(Gph.EQUALS_SIGN))),
      endCaptures: {
        1: { name: Sco.COLON },
        2: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        {
          begin:
            lookBehind(
              alt(
                lastOps(Gph.VERTICAL_LINE),
                lastWords(Kwd.AND, Kwd.FUN))),
          end: alt(Lex.operator, Lex.vid, lookAhead(complement(Cls.space, Cls.alpha))),
          endCaptures: {
            0: { name: Sco.FUNCTION_NAME },
          },
        },
        { include: `#pat` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON)),
      end: alt(ops(Gph.EQUALS_SIGN), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(capture(ops(Gph.VERTICAL_LINE)), capture(words(Kwd.AND)), Rx.topdecEnd),
      endCaptures: {
        1: { name: Sco.VERTICAL_LINE },
        2: { name: Sco.AND },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
  ],
};

export const infexp: schema.Rule = {
  patterns: [
    { include: `#appexp` },
  ],
};

export const match: schema.Rule = {
  patterns: [
    {
      begin:
        lookBehind(
          alt(
            lastWords(Kwd.FN, Kwd.HANDLE, Kwd.OF),
            lastOps(Gph.VERTICAL_LINE))),
      end: ops(seq(Gph.EQUALS_SIGN, Gph.GREATER_THAN_SIGN)),
      endCaptures: {
        0: { name: Sco.CASE },
      },
      patterns: [
        { include: `#comment` },
        { include: `#pat` },
      ],
    },
    {
      begin: lookBehind(lastOps(seq(Gph.EQUALS_SIGN, Gph.GREATER_THAN_SIGN))),
      end: alt(ops(Gph.VERTICAL_LINE), Rx.expEnd),
      endCaptures: {
        0: { name: Sco.VERTICAL_LINE },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
  ],
};

export const pat: schema.Rule = {
  patterns: [
    {
      begin: Gph.LEFT_CURLY_BRACKET,
      end: Gph.RIGHT_CURLY_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#patrow` },
      ],
    },
    {
      begin: Gph.LEFT_SQUARE_BRACKET,
      end: Gph.RIGHT_SQUARE_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#pat` },
      ],
    },
    { include: `#constant` },
    {
      // FIXME
      match: alt(capture(ops(Gph.COMMA)), capture(Lex.operator), capture(words(Kwd.AS))),
      captures: {
        1: { name: Sco.COMMA },
        2: { name: Sco.OPERATOR },
        3: { name: Sco.KEYWORD },
      },
    },
    {
      // FIXME: pattern variable
      match: alt(capture(ops(Gph.LOW_LINE)), capture(seq(lookAhead(set(Cls.lower)), Lex.vid))),
      captures: {
        1: { name: `${Sco.COMMENT} ${Sco.DELIMITER}` },
        2: { name: Sco.PATTERN_VARIABLE },
      },
    },
    {
      // FIXME
      begin: Gph.LEFT_PARENTHESIS,
      end: Gph.RIGHT_PARENTHESIS,
      captures: {
        0: { name: Sco.DELIMITER },
      },
      patterns: [
        { include: `#comment` },
        {
          begin: ops(Gph.COLON),
          end: lookAhead(Gph.RIGHT_PARENTHESIS),
          beginCaptures: {
            0: { name: Sco.COLON },
          },
          patterns: [
            { include: `#ty` },
          ],
        },
        { include: `#pat` },
      ],
    },
  ],
};

export const patrow: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(alt(Gph.LEFT_CURLY_BRACKET, Gph.COMMA)),
      end: alt(ops(alt(capture(Gph.COMMA), capture(Gph.COLON), capture(Gph.EQUALS_SIGN))), lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        1: { name: Sco.COMMA },
        2: { name: Sco.COLON },
        3: { name: Sco.COLON },
      },
      patterns: [
        {
          match: Lex.vid,
          name: Sco.FIELD_NAME,
        },
        {
          match: ops(Gph.ELLIPSIS),
          name: Sco.CONSTRUCTOR,
        },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON)),
      end: alt(Gph.COMMA, lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        0: { name: Sco.PUNCTUATION },
      },
      patterns: [
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(Gph.COMMA, lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        0: { name: Sco.COMMA },
      },
      patterns: [
        { include: `#pat` },
      ],
    },
  ],
};

export const qualifiedConstant: schema.Rule = {
  patterns: [
    { include: `#qualifiedPrefix` },
    {
      match: seq(lookAhead(set(Cls.upper)), Lex.vid),
      name: Sco.CONSTRUCTOR,
    },
  ],
};

export const qualifiedModule: schema.Rule = {
  patterns: [
    { include: `#qualifiedPrefix` },
    {
      match: seq(lookAhead(set(Cls.upper)), Lex.vid),
      name: Sco.MODULE_NAME,
    },
  ],
};

export const qualifiedPrefix: schema.Rule = {
  begin: seq(lookAhead(set(Cls.upper)), Lex.vid, lookAhead(seq(many(set(Cls.space)), Gph.FULL_STOP))),
  end: Gph.FULL_STOP,
  beginCaptures: {
    0: { name: Sco.MODULE_NAME },
  },
  endCaptures: {
    0: { name: Sco.DOT },
  },
};

export const qualifiedType: schema.Rule = {
  patterns: [
    { include: `#qualifiedPrefix` },
    {
      match: Lex.vid,
      name: Sco.TYPE_CONSTRUCTOR,
    },
  ],
};

export const row: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(alt(Gph.LEFT_CURLY_BRACKET, Gph.COMMA)),
      end: alt(ops(alt(capture(Gph.COMMA), capture(Gph.COLON), capture(Gph.EQUALS_SIGN))), lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        1: { name: Sco.COMMA },
        2: { name: Sco.COLON },
        3: { name: Sco.COLON },
      },
      patterns: [
        {
          match: Lex.vid,
          name: Sco.FIELD_NAME,
        },
        {
          match: ops(Gph.ELLIPSIS),
          name: Sco.CONSTRUCTOR,
        },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON)),
      end: alt(Gph.COMMA, lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        0: { name: Sco.PUNCTUATION },
      },
      patterns: [
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(Gph.COMMA, lookAhead(Gph.RIGHT_CURLY_BRACKET)),
      endCaptures: {
        0: { name: Sco.COMMA },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
  ],
};

export const scon: schema.Rule = {
  patterns: [],
};

export const sigbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(lastWords(Kwd.SIGNATURE, Kwd.AND)),
      end: ops(Gph.EQUALS_SIGN),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        { include: `#qualifiedModule` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(words(Kwd.AND), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.AND },
      },
      patterns: [
        { include: `#sigexp` },
      ],
    },
    {
      begin: lookBehind(lastWords(Kwd.AND)),
      end: alt(words(Kwd.AND), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.AND },
      },
      patterns: [
        { include: `#sigbind` },
      ],
    },
  ],
};

export const sigdec: schema.Rule = {
  patterns: [
    { include: `#comment` },
    {
      begin: words(Kwd.SIGNATURE),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#sigbind` },
      ],
    },
  ],
};

export const sigexp: schema.Rule = {
  patterns: [
    { include: `#comment` },
    {
      begin: words(Kwd.SIG),
      end: words(Kwd.END),
      patterns: [
        { include: `#spec` },
      ],
      captures: {
        0: { name: Sco.SIG },
      },
    },
    {
      begin: alt(lookBehind(lastWords(Kwd.WHERE)), words(Kwd.WHERE)),
      end:
        alt(
          capture(words(Kwd.WHERE)),
          lookAhead(
            alt(
              ops(Gph.EQUALS_SIGN),
              Rx.topdecEndSansType))),
      beginCaptures: {
        0: { name: Sco.KEYWORD },
      },
      endCaptures: {
        1: { name: Sco.KEYWORD },
      },
      patterns: [
        { include: `#decType` },
      ],
    },
    { include: `#qualifiedModule` },
  ],
};

export const spec: schema.Rule = {
  patterns: [
    { include: `#comment` },
    { include: `#decVal` },
    { include: `#decType` },
    { include: `#decDatatype` },
    { include: `#decException` },
    { include: `#strdecStructure` },
    {
      begin: words(Kwd.INCLUDE),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.INCLUDE },
      },
      patterns: [
        { include: `#sigexp` },
      ],
    },
  ],
};

export const strbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(lastWords(Kwd.STRUCTURE, Kwd.AND)),
      end: ops(alt(capture(seq(Gph.COLON, opt(Gph.GREATER_THAN_SIGN))), capture(Gph.EQUALS_SIGN))),
      endCaptures: {
        1: { name: Sco.COLON },
        2: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        { include: `#qualifiedModule` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON, seq(Gph.COLON, Gph.GREATER_THAN_SIGN))),
      end: alt(ops(Gph.EQUALS_SIGN), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#sigexp` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(words(Kwd.AND), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.AND },
      },
      patterns: [
        { include: `#strexp` },
      ],
    },
  ],
};

export const strdec: schema.Rule = {
  patterns: [
    { include: `#comment` },
    { include: `#dec` },
    { include: `#strdecStructure` },
    {
      begin: words(Kwd.LOCAL),
      end: lookBehind(lastWords(Kwd.END)),
      beginCaptures: {
        0: { name: Sco.LOCAL },
      },
      patterns: [
        {
          begin: lookBehind(lastWords(Kwd.LOCAL)),
          end: words(Kwd.IN),
          endCaptures: {
            0: { name: Sco.LOCAL },
          },
          patterns: [
            { include: `#dec` },
            { include: `#strdec` },
          ],
        },
        {
          begin: lookBehind(lastWords(Kwd.IN)),
          end: words(Kwd.END),
          endCaptures: {
            0: { name: Sco.LOCAL },
          },
          patterns: [
            { include: `#dec` },
            { include: `#strdec` },
          ],
        },
      ],
    },
  ],
};

export const strdecStructure: schema.Rule = {
  patterns: [
    {
      begin: words(Kwd.STRUCTURE),
      end: Rx.topdecEnd,
      beginCaptures: {
        0: { name: Sco.STRUCTURE },
      },
      patterns: [
        { include: `#strbind` },
      ],
    },
  ],
};

export const strdesc: schema.Rule = {
  patterns: [],
};

export const strexp: schema.Rule = {
  patterns: [
    { include: `#comment` },
    {
      begin: words(Kwd.STRUCT),
      end: words(Kwd.END),
      patterns: [
        { include: `#strdec` },
      ],
      beginCaptures: {
        0: { name: Sco.STRUCT },
      },
      endCaptures: {
        0: { name: Sco.STRUCT },
      },
    },
    { include: `#qualifiedModule` },
  ],
};

export const topdec: schema.Rule = {
  patterns: [
    { include: `#strdec` },
    { include: `#sigdec` },
    { include: `#fundec` },
  ],
};

export const ty: schema.Rule = {
  patterns: [
    { include: `#comment` },
    {
      match: Lex.tyvar,
      captures: {
        1: { name: Sco.APOSTROPHE },
        2: { name: Sco.TYPE_VARIABLE },
      },
    },
    {
      begin: Gph.LEFT_CURLY_BRACKET,
      end: Gph.RIGHT_CURLY_BRACKET,
      captures: {
        0: { name: Sco.CONSTRUCTOR },
      },
      patterns: [
        { include: `#row` },
      ],
    },
    {
      match:
        ops(
          alt(
            seq(Gph.HYPHEN_MINUS, Gph.GREATER_THAN_SIGN),
            Gph.ASTERISK)),
      name: Sco.TYPE_OPERATOR,
    },
    {
      begin: Gph.LEFT_PARENTHESIS,
      end: Gph.RIGHT_PARENTHESIS,
      captures: {
        0: { name: Sco.DELIMITER },
      },
      patterns: [
        { include: `#ty` },
        {
          match: Gph.COMMA,
          name: Sco.COMMA,
        },
      ],
    },
    {
      patterns: [
        { include: `#qualifiedType` },
      ],
    },
  ],
};

export const typbind: schema.Rule = {
  patterns: [
    {
      begin: lookBehind(lastWords(Kwd.TYPE)),
      end: alt(Rx.topdecEnd, capture(ops(Gph.EQUALS_SIGN))),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#comment` },
        {
          match: Lex.vid,
          name: Sco.TYPE_NAME,
        },
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(Rx.topdecEnd, lookAhead(alt(words(Kwd.WHERE), Gph.EQUALS_SIGN))),
      patterns: [
        { include: `#comment` },
        { include: `#ty` },
      ],
    },
  ],
};

export const typdesc: schema.Rule = {
  patterns: [],
};

export const valbind: schema.Rule = {
  patterns: [
    {
      begin:
        lookBehind(
          alt(
            lastOps(Gph.VERTICAL_LINE),
            lastWords(Kwd.AND, Kwd.VAL))),
      end: alt(ops(alt(capture(Gph.COLON), capture(Gph.EQUALS_SIGN))), Rx.topdecEnd),
      endCaptures: {
        1: { name: Sco.COLON },
        2: { name: Sco.COLON },
      },
      patterns: [
        {
          begin:
            lookBehind(
              alt(
                lastOps(Gph.VERTICAL_LINE),
                lastWords(Kwd.AND, Kwd.VAL))),
          end: alt(capture(words(Kwd.REC)), capture(seq(lookAhead(set(Cls.lower)), Lex.vid)), lookAhead(complement(Cls.space, Cls.alpha))),
          endCaptures: {
            1: { name: Sco.REC },
            2: { name: Sco.FUNCTION_NAME },
          },
          patterns: [
            { include: `#pat` },
          ],
        },
        {
          begin: lookBehind(lastWords(Kwd.REC)),
          end: alt(capture(seq(lookAhead(set(Cls.lower)), Lex.vid)), lookAhead(complement(Cls.space, Cls.alpha))),
          endCaptures: {
            0: { name: Sco.FUNCTION_NAME },
          },
        },
        { include: `#pat` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.COLON)),
      end: alt(ops(Gph.EQUALS_SIGN), Rx.topdecEnd),
      endCaptures: {
        0: { name: Sco.COLON },
      },
      patterns: [
        { include: `#ty` },
      ],
    },
    {
      begin: lookBehind(lastOps(Gph.EQUALS_SIGN)),
      end: alt(capture(ops(Gph.VERTICAL_LINE)), capture(words(Kwd.AND)), Rx.topdecEnd),
      endCaptures: {
        1: { name: Sco.VERTICAL_LINE },
        2: { name: Sco.AND },
      },
      patterns: [
        { include: `#exp` },
      ],
    },
  ],
};

export const valdesc: schema.Rule = {
  patterns: [],
};

const grammar: schema.IGrammar = {
  name: `Standard ML`,
  scopeName: `source.sml`,
  fileTypes: [`.fun`, `.sig`, `.sml`, `.cm`, `.lex`, `.grm`],
  patterns: [
    { include: `#topdec` },
  ],
  repository: {
    appexp,
    atexp,
    atpat,
    comment,
    conbind,
    condesc,
    constant,
    constantNumber,
    constantString,
    datbind,
    datdesc,
    dec,
    decDatatype,
    decException,
    decType,
    decVal,
    exbind,
    exdesc,
    exp,
    funbind,
    fundec,
    fvalbind,
    infexp,
    match,
    pat,
    patrow,
    qualifiedConstant,
    qualifiedModule,
    qualifiedPrefix,
    qualifiedType,
    row,
    scon,
    sigbind,
    sigdec,
    sigexp,
    spec,
    strbind,
    strdec,
    strdecStructure,
    strdesc,
    strexp,
    topdec,
    ty,
    typbind,
    typdesc,
    valbind,
    valdesc,
  },
};

export default grammar;
