"use strict";
(() => {
  // node_modules/@iden3/js-crypto/dist/browser/esm/index.js
  var cI = Object.defineProperty;
  var DI = (G2, I2) => {
    for (var E in I2)
      cI(G2, E, { get: I2[E], enumerable: true });
  };
  var M = {};
  DI(M, { beBuff2int: () => ZI, beInt2Buff: () => WI, leBuff2int: () => pI, leInt2Buff: () => lI, unstringifyBigInts: () => d });
  var B = {};
  DI(B, { abs: () => fI, add: () => iI, band: () => KI, bitLength: () => f, bits: () => l, bor: () => TI, bxor: () => PI, div: () => P, e: () => nI, eq: () => aI, exp: () => bI, fromArray: () => wI, fromRprBE: () => z, fromRprLE: () => m, fromString: () => R, geq: () => RI, gt: () => xI, isNegative: () => MI, isOdd: () => p, isZero: () => Z, land: () => qI, leq: () => OI, lor: () => VI, lt: () => yI, mod: () => hI, mul: () => QI, naf: () => tI, neg: () => kI, neq: () => uI, one: () => w, pow: () => N, shiftLeft: () => sI, shiftRight: () => W, shl: () => UI, shr: () => eI, square: () => YI, sub: () => T, toArray: () => rI, toLEBuff: () => vI, toNumber: () => JI, toRprBE: () => X, toRprLE: () => q, toString: () => SI, zero: () => y });
  var BI = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
  var R = (G2, I2) => {
    if (!I2 || I2 === 10)
      return BigInt(G2);
    if (I2 === 16)
      return G2.slice(0, 2) == "0x" ? BigInt(G2) : BigInt("0x" + G2);
    throw new Error("Unsupported radix");
  };
  var nI = R;
  var wI = (G2, I2) => {
    let E = BigInt(0), A2 = BigInt(I2);
    for (let o2 = 0; o2 < G2.length; o2++)
      E = E * A2 + BigInt(G2[o2]);
    return E;
  };
  var f = (G2) => {
    let I2 = G2.toString(16);
    return (I2.length - 1) * 4 + BI[parseInt(I2[0], 16)];
  };
  var MI = (G2) => BigInt(G2) < BigInt(0);
  var Z = (G2) => G2 === y;
  var sI = (G2, I2) => G2 << I2;
  var W = (G2, I2) => G2 >> I2;
  var UI = sI;
  var eI = W;
  var p = (G2) => (G2 & w) == w;
  var tI = (G2) => {
    let I2 = G2, E = [];
    for (; I2; ) {
      if (I2 & w) {
        let A2 = 2 - Number(I2 % BigInt(4));
        E.push(A2), I2 = I2 - BigInt(A2);
      } else
        E.push(0);
      I2 = I2 >> w;
    }
    return E;
  };
  var l = (G2) => {
    let I2 = G2, E = [];
    for (; I2; )
      I2 & w ? E.push(1) : E.push(0), I2 = I2 >> w;
    return E;
  };
  var JI = (G2) => {
    if (G2 > BigInt(Number.MAX_SAFE_INTEGER))
      throw new Error("Number too big");
    return Number(G2);
  };
  var rI = (G2, I2) => {
    let E = [], A2 = G2, o2 = I2;
    for (; A2; )
      E.unshift(Number(A2 % o2)), A2 = A2 / o2;
    return E;
  };
  var iI = (G2, I2) => G2 + I2;
  var T = (G2, I2) => G2 - I2;
  var kI = (G2) => -G2;
  var QI = (G2, I2) => G2 * I2;
  var YI = (G2) => G2 * G2;
  var N = (G2, I2) => G2 ** I2;
  var bI = (G2, I2) => G2 ** I2;
  var fI = (G2) => G2 >= 0 ? G2 : -G2;
  var P = (G2, I2) => G2 / I2;
  var hI = (G2, I2) => G2 % I2;
  var aI = (G2, I2) => G2 === I2;
  var uI = (G2, I2) => G2 !== I2;
  var yI = (G2, I2) => G2 < I2;
  var xI = (G2, I2) => G2 > I2;
  var OI = (G2, I2) => G2 <= I2;
  var RI = (G2, I2) => G2 >= I2;
  var KI = (G2, I2) => G2 & I2;
  var TI = (G2, I2) => G2 | I2;
  var PI = (G2, I2) => G2 ^ I2;
  var qI = (G2, I2) => G2 && I2;
  var VI = (G2, I2) => G2 || I2;
  var q = (G2, I2, E, A2) => {
    let o2 = "0000000" + E.toString(16), D = new Uint32Array(G2.buffer, G2.byteOffset + I2, A2 / 4), s2 = ((o2.length - 7) * 4 - 1 >> 5) + 1;
    for (let t = 0; t < s2; t++)
      D[t] = parseInt(o2.substring(o2.length - 8 * t - 8, o2.length - 8 * t), 16);
    for (let t = s2; t < D.length; t++)
      D[t] = 0;
    for (let t = D.length * 4; t < A2; t++)
      G2[t] = JI(KI(W(E, BigInt(t * 8)), BigInt(255)));
  };
  var X = (G2, I2, E, A2) => {
    let o2 = "0000000" + E.toString(16), D = new DataView(G2.buffer, G2.byteOffset + I2, A2), s2 = ((o2.length - 7) * 4 - 1 >> 5) + 1;
    for (let t = 0; t < s2; t++)
      D.setUint32(A2 - t * 4 - 4, parseInt(o2.substring(o2.length - 8 * t - 8, o2.length - 8 * t), 16), false);
    for (let t = 0; t < A2 / 4 - s2; t++)
      D.setInt32(0, 0, false);
  };
  var m = (G2, I2, E) => {
    E = E || G2.byteLength, I2 = I2 || 0;
    let A2 = new Uint32Array(G2.buffer, G2.byteOffset + I2, E / 4), o2 = new Array(E / 4);
    return A2.forEach((D, s2) => o2[o2.length - s2 - 1] = D.toString(16).padStart(8, "0")), R(o2.join(""), 16);
  };
  var z = (G2, I2, E) => {
    E = E || G2.byteLength, I2 = I2 || 0;
    let A2 = new DataView(G2.buffer, G2.byteOffset + I2, E), o2 = new Array(E / 4);
    for (let D = 0; D < E / 4; D++)
      o2[D] = A2.getUint32(D * 4, false).toString(16).padStart(8, "0");
    return R(o2.join(""), 16);
  };
  var SI = (G2, I2 = 10) => G2.toString(I2);
  var vI = (G2) => {
    let I2 = new Uint8Array(Math.floor((f(G2) - 1) / 8) + 1);
    return q(I2, 0, G2, I2.byteLength), I2;
  };
  var y = BigInt(0);
  var w = BigInt(1);
  function d(G2) {
    if (Array.isArray(G2))
      return G2.map(d);
    if (typeof G2 == "object") {
      let A2 = {};
      for (let [o2, D] of Object.entries(G2))
        A2[o2] = d(D);
      return A2;
    }
    let E = [...Uint8Array.from(atob(G2), (A2) => A2.charCodeAt(0))].map((A2) => A2.toString(16).padStart(2, "0")).join("");
    return BigInt(`0x${E}`);
  }
  function ZI(G2) {
    let I2 = BigInt(0), E = G2.length, A2 = 0, o2 = new DataView(G2.buffer, G2.byteOffset, G2.byteLength);
    for (; E > 0; )
      E >= 4 ? (E -= 4, I2 += BigInt(o2.getUint32(E)) << BigInt(A2 * 8), A2 += 4) : E >= 2 ? (E -= 2, I2 += BigInt(o2.getUint16(E)) << BigInt(A2 * 8), A2 += 2) : (E -= 1, I2 += BigInt(o2.getUint8(E)) << BigInt(A2 * 8), A2 += 1);
    return I2;
  }
  function WI(G2, I2) {
    let E = G2, A2 = new Uint8Array(I2), o2 = new DataView(A2.buffer), D = I2;
    for (; D > 0; )
      D - 4 >= 0 ? (D -= 4, o2.setUint32(D, Number(E & BigInt(4294967295))), E = E >> BigInt(32)) : D - 2 >= 0 ? (D -= 2, o2.setUint16(D, Number(E & BigInt(65535))), E = E >> BigInt(16)) : (D -= 1, o2.setUint8(D, Number(E & BigInt(255))), E = E >> BigInt(8));
    if (E)
      throw new Error("Number does not fit in this length");
    return A2;
  }
  function pI(G2) {
    let I2 = BigInt(0), E = 0, A2 = new DataView(G2.buffer, G2.byteOffset, G2.byteLength);
    for (; E < G2.length; )
      E + 4 <= G2.length ? (I2 += BigInt(A2.getUint32(E, true)) << BigInt(E * 8), E += 4) : E + 2 <= G2.length ? (I2 += BigInt(A2.getUint16(E, true)) << BigInt(E * 8), E += 2) : (I2 += BigInt(A2.getUint8(E)) << BigInt(E * 8), E += 1);
    return I2;
  }
  function lI(G2, I2) {
    let E = G2;
    typeof I2 > "u" && (I2 = Math.floor((f(G2) - 1) / 8) + 1, I2 == 0 && (I2 = 1));
    let A2 = new Uint8Array(I2), o2 = new DataView(A2.buffer), D = 0;
    for (; D < I2; )
      D + 4 <= I2 ? (o2.setUint32(D, Number(E & BigInt(4294967295)), true), D += 4, E = E >> BigInt(32)) : D + 2 <= I2 ? (o2.setUint16(D, Number(E & BigInt(65535)), true), D += 2, E = E >> BigInt(16)) : (o2.setUint8(D, Number(E & BigInt(255))), D += 1, E = E >> BigInt(8));
    if (E)
      throw new Error("Number does not fit in this length");
    return A2;
  }
  function V(G2) {
    if (G2 <= 0)
      throw new Error("Length must be greater than 0");
    let I2 = globalThis;
    if (I2.crypto?.getRandomValues) {
      let E = new Uint8Array(G2);
      return I2.crypto.getRandomValues(E), E;
    }
    throw new Error("Random byte generation is not supported in this environment");
  }
  var i = class {
    constructor(I2) {
      this.type = "F1", this.one = BigInt(1), this.zero = BigInt(0), this.p = BigInt(I2), this.m = w, this.negone = this.p - this.one, this.two = BigInt(2), this.half = this.p >> this.one, this.bitLength = f(this.p), this.mask = (this.one << BigInt(this.bitLength)) - this.one, this.n64 = Math.floor((this.bitLength - 1) / 64) + 1, this.n32 = this.n64 * 2, this.n8 = this.n64 * 8, this.R = this.e(this.one << BigInt(this.n64 * 64)), this.Ri = this.inv(this.R);
      let E = this.negone >> this.one;
      this.nqr = this.two;
      let A2 = this.pow(this.nqr, E);
      for (; !this.eq(A2, this.negone); )
        this.nqr = this.nqr + this.one, A2 = this.pow(this.nqr, E);
      for (this.s = 0, this.t = this.negone; (this.t & this.one) == this.zero; )
        this.s = this.s + 1, this.t = this.t >> this.one;
      this.nqr_to_t = this.pow(this.nqr, this.t), NI(this), this.shift = this.square(this.nqr), this.k = this.exp(this.nqr, BigInt(2 ** this.s));
    }
    e(I2, E = void 0) {
      let A2;
      if (E ? E == BigInt(16) && (A2 = BigInt("0x" + I2)) : A2 = BigInt(I2), A2 < 0) {
        let o2 = -A2;
        return o2 >= this.p && (o2 = o2 % this.p), this.p - o2;
      } else
        return A2 >= this.p ? A2 % this.p : A2;
    }
    add(I2, E) {
      let A2 = I2 + E;
      return A2 >= this.p ? A2 - this.p : A2;
    }
    sub(I2, E) {
      return I2 >= E ? I2 - E : this.p - E + I2;
    }
    neg(I2) {
      return I2 && this.p - I2;
    }
    double(I2) {
      return this.add(I2, I2);
    }
    mul(I2, E) {
      return I2 * E % this.p;
    }
    mulScalar(I2, E) {
      return I2 * this.e(E) % this.p;
    }
    square(I2) {
      return I2 * I2 % this.p;
    }
    eq(I2, E) {
      return I2 == E;
    }
    neq(I2, E) {
      return I2 != E;
    }
    lt(I2, E) {
      let A2 = I2 > this.half ? I2 - this.p : I2, o2 = E > this.half ? E - this.p : E;
      return A2 < o2;
    }
    gt(I2, E) {
      let A2 = I2 > this.half ? I2 - this.p : I2, o2 = E > this.half ? E - this.p : E;
      return A2 > o2;
    }
    leq(I2, E) {
      let A2 = I2 > this.half ? I2 - this.p : I2, o2 = E > this.half ? E - this.p : E;
      return A2 <= o2;
    }
    geq(I2, E) {
      let A2 = I2 > this.half ? I2 - this.p : I2, o2 = E > this.half ? E - this.p : E;
      return A2 >= o2;
    }
    div(I2, E) {
      return this.mul(I2, this.inv(E));
    }
    idiv(I2, E) {
      if (!E)
        throw new Error("Division by zero");
      return I2 / E;
    }
    inv(I2) {
      if (!I2)
        throw new Error("Division by zero");
      let E = this.zero, A2 = this.p, o2 = this.one, D = I2 % this.p;
      for (; D; ) {
        let s2 = A2 / D;
        [E, o2] = [o2, E - s2 * o2], [A2, D] = [D, A2 - s2 * D];
      }
      return E < this.zero && (E += this.p), E;
    }
    mod(I2, E) {
      return I2 % E;
    }
    pow(I2, E) {
      return HI(this, I2, E);
    }
    exp(I2, E) {
      return HI(this, I2, BigInt(E));
    }
    band(I2, E) {
      let A2 = I2 & E & this.mask;
      return A2 >= this.p ? A2 - this.p : A2;
    }
    bor(I2, E) {
      let A2 = (I2 | E) & this.mask;
      return A2 >= this.p ? A2 - this.p : A2;
    }
    bxor(I2, E) {
      let A2 = (I2 ^ E) & this.mask;
      return A2 >= this.p ? A2 - this.p : A2;
    }
    bnot(I2) {
      let E = I2 ^ this.mask;
      return E >= this.p ? E - this.p : E;
    }
    shl(I2, E) {
      if (Number(E) < this.bitLength) {
        let A2 = I2 << E & this.mask;
        return A2 >= this.p ? A2 - this.p : A2;
      } else {
        let A2 = this.p - E;
        return Number(A2) < this.bitLength ? I2 >> A2 : this.zero;
      }
    }
    shr(I2, E) {
      if (Number(E) < this.bitLength)
        return I2 >> E;
      {
        let A2 = this.p - E;
        if (Number(A2) < this.bitLength) {
          let o2 = I2 << A2 & this.mask;
          return o2 >= this.p ? o2 - this.p : o2;
        } else
          return y;
      }
    }
    land(I2, E) {
      return I2 && E ? this.one : this.zero;
    }
    lor(I2, E) {
      return I2 || E ? this.one : this.zero;
    }
    sqrt_old(I2) {
      if (I2 == this.zero)
        return this.zero;
      if (this.pow(I2, this.negone >> this.one) != this.one)
        return null;
      let A2 = this.s, o2 = this.nqr_to_t, D = this.pow(I2, this.t), s2 = this.pow(I2, this.add(this.t, this.one) >> this.one);
      for (; D != this.one; ) {
        let t = this.square(D), H2 = 1;
        for (; t != this.one; )
          H2++, t = this.square(t);
        let J2 = o2;
        for (let K2 = 0; K2 < A2 - H2 - 1; K2++)
          J2 = this.square(J2);
        A2 = H2, o2 = this.square(J2), D = this.mul(D, o2), s2 = this.mul(s2, J2);
      }
      return s2 > this.p >> this.one && (s2 = this.neg(s2)), s2;
    }
    normalize(I2) {
      if (I2 < 0) {
        let E = -I2;
        return E >= this.p && (E = E % this.p), this.p - E;
      } else
        return I2 >= this.p ? I2 % this.p : I2;
    }
    random() {
      let I2 = this.bitLength * 2 / 8, E = this.zero;
      for (let A2 = 0; A2 < I2; A2++)
        E = (E << BigInt(8)) + BigInt(V(1)[0]);
      return E % this.p;
    }
    toString(I2, E = 10) {
      E = E || 10;
      let A2;
      return I2 > this.half && E == 10 ? A2 = "-" + (this.p - I2).toString(E) : A2 = I2.toString(E), A2;
    }
    isZero(I2) {
      return I2 == this.zero;
    }
    toRprLE(I2, E, A2) {
      q(I2, E, A2, this.n64 * 8);
    }
    toRprBE(I2, E, A2) {
      X(I2, E, A2, this.n64 * 8);
    }
    toRprBEM(I2, E, A2) {
      return this.toRprBE(I2, E, this.mul(this.R, A2));
    }
    toRprLEM(I2, E, A2) {
      return this.toRprLE(I2, E, this.mul(this.R, A2));
    }
    fromRprLE(I2, E) {
      return m(I2, E, this.n8);
    }
    fromRprBE(I2, E) {
      return z(I2, E, this.n8);
    }
    fromRprLEM(I2, E) {
      return this.mul(this.fromRprLE(I2, E), this.Ri);
    }
    fromRprBEM(I2, E) {
      return this.mul(this.fromRprBE(I2, E), this.Ri);
    }
    toObject(I2) {
      return I2;
    }
    sqrt(I2) {
      throw new Error("Not implemented sqrt for F1" + I2);
    }
  };
  function NI(G2) {
    for (G2.sqrt_q = N(G2.p, G2.m), G2.sqrt_s = y, G2.sqrt_t = T(G2.sqrt_q, w); !p(G2.sqrt_t); )
      G2.sqrt_s = G2.sqrt_s + w, G2.sqrt_t = P(G2.sqrt_t, 2n);
    let I2 = G2.one;
    for (; G2.eq(I2, G2.one); ) {
      let E = G2.random();
      G2.sqrt_z = G2.pow(E, G2.sqrt_t), I2 = G2.pow(G2.sqrt_z, 2n ** (G2.sqrt_s - w));
    }
    G2.sqrt_tm1d2 = P(T(G2.sqrt_t, w), 2n), G2.sqrt = (E) => {
      if (G2.isZero(E))
        return G2.zero;
      let A2 = G2.pow(E, G2.sqrt_tm1d2), o2 = G2.pow(G2.mul(G2.square(A2), E), 2n ** (G2.sqrt_s - w));
      if (G2.eq(o2, G2.negone))
        return null;
      let D = G2.sqrt_s, s2 = G2.mul(E, A2), t = G2.mul(s2, A2), H2 = G2.sqrt_z;
      for (; !G2.eq(t, G2.one); ) {
        let J2 = G2.square(t), K2 = w;
        for (; !G2.eq(J2, G2.one); )
          J2 = G2.square(J2), K2++;
        A2 = H2;
        for (let C = 0; C < D - K2 - w; C++)
          A2 = G2.square(A2);
        H2 = G2.square(A2), t = G2.mul(t, H2), s2 = G2.mul(s2, A2), D = K2;
      }
      return G2.geq(s2, G2.zero) ? s2 : G2.neg(s2);
    };
  }
  function HI(G2, I2, E) {
    if (Z(E))
      return G2.one;
    let A2 = l(E);
    if (A2.length == 0)
      return G2.one;
    let o2 = I2;
    for (let D = A2.length - 2; D >= 0; D--)
      o2 = G2.square(o2), A2[D] && (o2 = G2.mul(o2, I2));
    return o2;
  }
  var j = class {
    constructor(I2) {
      this.F = I2, this.p = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617"), this.pm1d2 = B.div(B.sub(this.p, B.one), 2n), this.Generator = [I2.e("995203441582195749578291179787384436505546430278305826713579947235728471134"), I2.e("5472060717959818805561601436314318772137091100104008585924551046643952123905")], this.Base8 = [I2.e("5299619240641551281634865583518297030282874472190772894086521144482721001553"), I2.e("16950150798460657717958625567821834550301663161624707787222815936182638968203")], this.order = BigInt("21888242871839275222246405745257275088614511777268538073601725287587578984328"), this.subOrder = B.shiftRight(this.order, 3n), this.A = I2.e("168700"), this.D = I2.e("168696");
    }
    addPoint(I2, E) {
      let A2 = this.F, o2 = new Array(2), D = A2.mul(I2[0], E[1]), s2 = A2.mul(I2[1], E[0]), t = A2.mul(A2.sub(I2[1], A2.mul(this.A, I2[0])), A2.add(E[0], E[1])), H2 = A2.mul(D, s2), J2 = A2.mul(this.D, H2);
      return o2[0] = A2.div(A2.add(D, s2), A2.add(A2.one, J2)), o2[1] = A2.div(A2.add(t, A2.sub(A2.mul(this.A, D), s2)), A2.sub(A2.one, J2)), o2;
    }
    mulPointEscalar(I2, E) {
      let A2 = this.F, o2 = [A2.e("0"), A2.e("1")], D = E, s2 = I2;
      for (; !B.isZero(D); )
        B.isOdd(D) && (o2 = this.addPoint(o2, s2)), s2 = this.addPoint(s2, s2), D = B.shiftRight(D, B.one);
      return o2;
    }
    inSubgroup(I2) {
      let E = this.F;
      if (!this.inCurve(I2))
        return false;
      let A2 = this.mulPointEscalar(I2, this.subOrder);
      return E.isZero(A2[0]) && E.eq(A2[1], E.one);
    }
    inCurve(I2) {
      let E = this.F, A2 = E.square(I2[0]), o2 = E.square(I2[1]);
      return !!E.eq(E.add(E.mul(this.A, A2), o2), E.add(E.one, E.mul(E.mul(A2, o2), this.D)));
    }
    packPoint(I2) {
      let E = this.F, A2 = new Uint8Array(32);
      E.toRprLE(A2, 0, I2[1]);
      let o2 = E.toObject(I2[0]);
      return B.gt(o2, this.pm1d2) && (A2[31] = A2[31] | 128), A2;
    }
    unpackPoint(I2) {
      let E = this.F, A2 = false, o2 = [BigInt(0), BigInt(0)];
      if (I2[31] & 128 && (A2 = true, I2[31] = I2[31] & 127), o2[1] = E.fromRprLE(I2, 0), B.gt(E.toObject(o2[1]), this.p))
        return null;
      let D = E.square(o2[1]), s2 = E.div(E.sub(E.one, D), E.sub(this.A, E.mul(this.D, D))), t = E.exp(s2, BigInt(E.half));
      if (!E.eq(E.one, t))
        return null;
      let H2 = E.sqrt(s2);
      return H2 == null ? null : (A2 && (H2 = E.neg(H2)), o2[0] = BigInt(H2), o2);
    }
  };
  var XI = new i(BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617"));
  var n = new j(XI);
  var S = M.unstringifyBigInts(CI);
  var zI = 8;
  var gI = [56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68];
  var dI = 16;
  var k = 31;
  var L = new i(B.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));
  var x = (G2) => L.mul(G2, L.square(L.square(G2)));
  var h = class h2 {
    static hash(I2) {
      if (!(I2.length > 0 && I2.length <= gI.length))
        throw new Error("Invalid inputs");
      let E = I2.length + 1, A2 = zI, o2 = gI[E - 2], D = S.C[E - 2], s2 = S.S[E - 2], t = S.M[E - 2], H2 = S.P[E - 2], J2 = [L.zero, ...I2.map((K2) => L.e(K2))];
      J2 = J2.map((K2, C) => L.add(K2, D[C]));
      for (let K2 = 0; K2 < A2 / 2 - 1; K2++)
        J2 = J2.map((C) => x(C)), J2 = J2.map((C, F2) => L.add(C, D[(K2 + 1) * E + F2])), J2 = J2.map((C, F2) => J2.reduce((c2, g2, r) => L.add(c2, L.mul(t[r][F2], g2)), L.zero));
      J2 = J2.map((K2) => x(K2)), J2 = J2.map((K2, C) => L.add(K2, D[(A2 / 2 - 1 + 1) * E + C])), J2 = J2.map((K2, C) => J2.reduce((F2, c2, g2) => L.add(F2, L.mul(H2[g2][C], c2)), L.zero));
      for (let K2 = 0; K2 < o2; K2++) {
        J2[0] = x(J2[0]), J2[0] = L.add(J2[0], D[(A2 / 2 + 1) * E + K2]);
        let C = J2.reduce((F2, c2, g2) => L.add(F2, L.mul(s2[(E * 2 - 1) * K2 + g2], c2)), L.zero);
        for (let F2 = 1; F2 < E; F2++)
          J2[F2] = L.add(J2[F2], L.mul(J2[0], s2[(E * 2 - 1) * K2 + E + F2 - 1]));
        J2[0] = C;
      }
      for (let K2 = 0; K2 < A2 / 2 - 1; K2++)
        J2 = J2.map((C) => x(C)), J2 = J2.map((C, F2) => L.add(C, D[(A2 / 2 + 1) * E + o2 + K2 * E + F2])), J2 = J2.map((C, F2) => J2.reduce((c2, g2, r) => L.add(c2, L.mul(t[r][F2], g2)), L.zero));
      return J2 = J2.map((K2) => x(K2)), J2 = J2.map((K2, C) => J2.reduce((F2, c2, g2) => L.add(F2, L.mul(t[g2][C], c2)), L.zero)), L.normalize(J2[0]);
    }
    static hashBytes(I2) {
      return h2.hashBytesX(I2, dI);
    }
    static hashBytesX(I2, E) {
      let A2 = new Array(E).fill(BigInt(0)), o2 = false, D, s2 = 0;
      for (let t = 0; t < parseInt(`${I2.length / k}`); t += 1)
        if (o2 = true, A2[s2] = M.beBuff2int(I2.slice(k * t, k * (t + 1))), s2 === E - 1) {
          D = h2.hash(A2), o2 = false, A2[0] = D, A2.fill(BigInt(0), 1, k);
          for (let H2 = 1; H2 < E; H2 += 1)
            A2[H2] = BigInt(0);
          s2 = 1;
        } else
          s2 += 1;
      if (I2.length % k != 0) {
        let t = new Uint8Array(k);
        I2.slice(parseInt(`${I2.length / k}`) * k).forEach((J2, K2) => {
          t[K2] = J2;
        }), A2[s2] = M.beBuff2int(t), o2 = true;
      }
      return o2 && (D = h2.hash(A2)), D;
    }
    static spongeHashX(I2, E) {
      if (E < 2 || E > 16)
        throw new Error("incorrect frame size");
      let A2 = new Array(E).fill(BigInt(0)), o2 = false, D, s2 = 0;
      for (let t = 0; t < I2.length; t++)
        o2 = true, A2[s2] = I2[t], s2 === E - 1 ? (D = this.hash(A2), o2 = false, A2 = new Array(E).fill(BigInt(0)), A2[0] = D, s2 = 1) : s2++;
      if (o2 && (D = this.hash(A2)), !D)
        throw new Error("hash is undefined");
      return D;
    }
  };
  h.F = L;
  var _ = h;
  var $ = _;
  var jI = Uint8Array.from([1]);
  var _I = Uint8Array.from([129]);
  function v(G2, I2, E, A2) {
    let o2 = G2[I2 * 2] ^ G2[E * 2], D = G2[I2 * 2 + 1] ^ G2[E * 2 + 1];
    A2 >= 32 && (D = D ^ o2, o2 = D ^ o2, D = D ^ o2, A2 -= 32), A2 === 0 ? (G2[I2 * 2] = o2 >>> 0, G2[I2 * 2 + 1] = D >>> 0) : (G2[I2 * 2] = (o2 >>> A2 | D << 32 - A2) >>> 0, G2[I2 * 2 + 1] = (D >>> A2 | o2 << 32 - A2) >>> 0);
  }
  function Q(G2, I2, E, A2, o2, D, s2, t) {
    let H2 = Y.sigma, J2 = Y.u512, K2;
    K2 = G2[A2 * 2 + 1] + ((I2[H2[E][t] * 2 + 1] ^ J2[H2[E][t + 1] * 2 + 1]) >>> 0) + G2[o2 * 2 + 1], G2[A2 * 2] = G2[A2 * 2] + ((I2[H2[E][t] * 2] ^ J2[H2[E][t + 1] * 2]) >>> 0) + G2[o2 * 2] + ~~(K2 / 4294967296) >>> 0, G2[A2 * 2 + 1] = K2 >>> 0, v(G2, s2, A2, 32), K2 = G2[D * 2 + 1] + G2[s2 * 2 + 1], G2[D * 2] = G2[D * 2] + G2[s2 * 2] + ~~(K2 / 4294967296) >>> 0, G2[D * 2 + 1] = K2 >>> 0, v(G2, o2, D, 25), K2 = G2[A2 * 2 + 1] + ((I2[H2[E][t + 1] * 2 + 1] ^ J2[H2[E][t] * 2 + 1]) >>> 0) + G2[o2 * 2 + 1], G2[A2 * 2] = G2[A2 * 2] + ((I2[H2[E][t + 1] * 2] ^ J2[H2[E][t] * 2]) >>> 0) + G2[o2 * 2] + ~~(K2 / 4294967296) >>> 0, G2[A2 * 2 + 1] = K2 >>> 0, v(G2, s2, A2, 16), K2 = G2[D * 2 + 1] + G2[s2 * 2 + 1], G2[D * 2] = G2[D * 2] + G2[s2 * 2] + ~~(K2 / 4294967296) >>> 0, G2[D * 2 + 1] = K2 >>> 0, v(G2, o2, D, 11);
  }
  var e = class e2 {
    constructor() {
      this._h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this._s = [0, 0, 0, 0, 0, 0, 0, 0], this._block = new Uint8Array(128), this._blockOffset = 0, this._length = [0, 0, 0, 0], this._nullt = false, this._zo = jI, this._oo = _I;
    }
    _lengthCarry(I2) {
      for (let E = 0; E < I2.length && !(I2[E] < 4294967296); ++E)
        I2[E] -= 4294967296, I2[E + 1] += 1;
    }
    _compress() {
      let I2 = e2.u512, E = new Array(32), A2 = new Array(32), o2, D = new DataView(this._block.buffer);
      for (o2 = 0; o2 < 32; ++o2)
        A2[o2] = D.getUint32(o2 * 4);
      for (o2 = 0; o2 < 16; ++o2)
        E[o2] = this._h[o2] >>> 0;
      for (o2 = 16; o2 < 24; ++o2)
        E[o2] = (this._s[o2 - 16] ^ I2[o2 - 16]) >>> 0;
      for (o2 = 24; o2 < 32; ++o2)
        E[o2] = I2[o2 - 16];
      for (this._nullt || (E[24] = (E[24] ^ this._length[1]) >>> 0, E[25] = (E[25] ^ this._length[0]) >>> 0, E[26] = (E[26] ^ this._length[1]) >>> 0, E[27] = (E[27] ^ this._length[0]) >>> 0, E[28] = (E[28] ^ this._length[3]) >>> 0, E[29] = (E[29] ^ this._length[2]) >>> 0, E[30] = (E[30] ^ this._length[3]) >>> 0, E[31] = (E[31] ^ this._length[2]) >>> 0), o2 = 0; o2 < 16; ++o2)
        Q(E, A2, o2, 0, 4, 8, 12, 0), Q(E, A2, o2, 1, 5, 9, 13, 2), Q(E, A2, o2, 2, 6, 10, 14, 4), Q(E, A2, o2, 3, 7, 11, 15, 6), Q(E, A2, o2, 0, 5, 10, 15, 8), Q(E, A2, o2, 1, 6, 11, 12, 10), Q(E, A2, o2, 2, 7, 8, 13, 12), Q(E, A2, o2, 3, 4, 9, 14, 14);
      for (o2 = 0; o2 < 16; ++o2)
        this._h[o2 % 8 * 2] = (this._h[o2 % 8 * 2] ^ E[o2 * 2]) >>> 0, this._h[o2 % 8 * 2 + 1] = (this._h[o2 % 8 * 2 + 1] ^ E[o2 * 2 + 1]) >>> 0;
      for (o2 = 0; o2 < 8; ++o2)
        this._h[o2 * 2] = (this._h[o2 * 2] ^ this._s[o2 % 4 * 2]) >>> 0, this._h[o2 * 2 + 1] = (this._h[o2 * 2 + 1] ^ this._s[o2 % 4 * 2 + 1]) >>> 0;
    }
    _padding() {
      let I2 = this._length.slice();
      I2[0] += this._blockOffset * 8, this._lengthCarry(I2);
      let E = new Uint8Array(16), A2 = new DataView(E.buffer);
      for (let o2 = 0; o2 < 4; ++o2)
        A2.setUint32(o2 * 4, I2[3 - o2]);
      this._blockOffset === 111 ? (this._length[0] -= 8, this.update(this._oo)) : (this._blockOffset < 111 ? (this._blockOffset === 0 && (this._nullt = true), this._length[0] -= (111 - this._blockOffset) * 8, this.update(e2.padding.slice(0, 111 - this._blockOffset))) : (this._length[0] -= (128 - this._blockOffset) * 8, this.update(e2.padding.slice(0, 128 - this._blockOffset)), this._length[0] -= 111 * 8, this.update(e2.padding.slice(1, 1 + 111)), this._nullt = true), this.update(this._zo), this._length[0] -= 8), this._length[0] -= 128, this.update(new Uint8Array(A2.buffer));
    }
    digest() {
      this._padding();
      let I2 = new Uint8Array(64), E = new DataView(I2.buffer);
      for (let A2 = 0; A2 < 16; ++A2)
        E.setUint32(A2 * 4, this._h[A2]);
      return new Uint8Array(E.buffer);
    }
    update(I2) {
      let E = this._block, A2 = 0;
      for (; this._blockOffset + I2.length - A2 >= E.length; ) {
        for (let o2 = this._blockOffset; o2 < E.length; )
          E[o2++] = I2[A2++];
        this._length[0] += E.length * 8, this._lengthCarry(this._length), this._compress(), this._blockOffset = 0;
      }
      for (; A2 < I2.length; )
        E[this._blockOffset++] = I2[A2++];
      return this;
    }
  };
  e.sigma = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3], [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8], [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9], [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11], [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10], [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5], [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3], [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8], [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]], e.u256 = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479], e.u512 = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731, 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113], e.padding = Uint8Array.from([128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  var Y = e;
  var U = class U2 {
    static encodeLength(I2) {
      return I2 * 2;
    }
    static encode(I2) {
      let E = new Uint8Array(U2.encodeLength(I2.length)), A2 = 0;
      for (let o2 = 0; o2 < I2.length; o2++)
        E[A2] = U2.HEX_TABLE[I2[o2] >> 4].charCodeAt(0), E[A2 + 1] = U2.HEX_TABLE[I2[o2] & 15].charCodeAt(0), A2 += 2;
      return E;
    }
    static decodeString(I2) {
      return U2.decode(I2);
    }
    static fromHexChar(I2) {
      if ("0".charCodeAt(0) <= I2 && I2 <= "9".charCodeAt(0))
        return I2 - "0".charCodeAt(0);
      if ("a".charCodeAt(0) <= I2 && I2 <= "f".charCodeAt(0))
        return I2 - "a".charCodeAt(0) + 10;
      if ("A".charCodeAt(0) <= I2 && I2 <= "F".charCodeAt(0))
        return I2 - "A".charCodeAt(0) + 10;
      throw new Error(`Invalid byte char ${I2}`);
    }
    static decode(I2) {
      let E = 0, A2 = 1, o2 = [];
      for (; A2 < I2.length; A2 += 2) {
        let D = U2.fromHexChar(I2[A2 - 1].charCodeAt(0)), s2 = U2.fromHexChar(I2[A2].charCodeAt(0));
        o2[E] = D << 4 | s2, E++;
      }
      if (I2.length % 2 == 1)
        throw new Error("Invalid hex string");
      return Uint8Array.from(o2);
    }
    static encodeString(I2) {
      return new TextDecoder().decode(U2.encode(I2));
    }
  };
  U.HEX_TABLE = "0123456789abcdef", U.textEncoder = new TextEncoder();
  var b = U;
  var FI = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  var uE = (G2) => {
    let I2 = [], E = "", A2 = 0, o2 = 0, D;
    for (let s2 = 0; s2 < G2.length; s2++)
      for (A2 = 0, o2 = G2[s2], E += o2 || E.length ^ s2 ? "" : "1"; A2 in I2 || o2; )
        D = I2[A2], D = D ? D * 256 + o2 : o2, o2 = D / 58 | 0, I2[A2] = D % 58, A2++;
    for (; A2--; )
      E += FI[I2[A2]];
    return E;
  };
  var yE = (G2) => {
    let I2 = [], E = [], A2 = 0, o2 = 0, D = 0;
    for (let s2 = 0; s2 < G2.length; s2++) {
      if (A2 = 0, o2 = FI.indexOf(G2[s2]), o2 < 0)
        throw new Error(`Can't convert base58 string ${G2} to bytes`);
      for (o2 || E.length ^ s2 || E.push(0); A2 in I2 || o2; )
        D = I2[A2], D = D ? D * 58 + o2 : o2, o2 = D >> 8, I2[A2] = D % 256, A2++;
    }
    for (; A2--; )
      E.push(I2[A2]);
    return new Uint8Array(E);
  };
  var $I = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
  function GI(G2, I2, E, A2, o2) {
    let D, s2, t, H2, J2, K2, C, F2, c2, g2, r, u2, O2;
    for (; o2 >= 64; ) {
      for (D = I2[0], s2 = I2[1], t = I2[2], H2 = I2[3], J2 = I2[4], K2 = I2[5], C = I2[6], F2 = I2[7], g2 = 0; g2 < 16; g2++)
        r = A2 + g2 * 4, G2[g2] = (E[r] & 255) << 24 | (E[r + 1] & 255) << 16 | (E[r + 2] & 255) << 8 | E[r + 3] & 255;
      for (g2 = 16; g2 < 64; g2++)
        c2 = G2[g2 - 2], u2 = (c2 >>> 17 | c2 << 32 - 17) ^ (c2 >>> 19 | c2 << 32 - 19) ^ c2 >>> 10, c2 = G2[g2 - 15], O2 = (c2 >>> 7 | c2 << 32 - 7) ^ (c2 >>> 18 | c2 << 32 - 18) ^ c2 >>> 3, G2[g2] = (u2 + G2[g2 - 7] | 0) + (O2 + G2[g2 - 16] | 0);
      for (g2 = 0; g2 < 64; g2++)
        u2 = (((J2 >>> 6 | J2 << 32 - 6) ^ (J2 >>> 11 | J2 << 32 - 11) ^ (J2 >>> 25 | J2 << 32 - 25)) + (J2 & K2 ^ ~J2 & C) | 0) + (F2 + ($I[g2] + G2[g2] | 0) | 0) | 0, O2 = ((D >>> 2 | D << 32 - 2) ^ (D >>> 13 | D << 32 - 13) ^ (D >>> 22 | D << 32 - 22)) + (D & s2 ^ D & t ^ s2 & t) | 0, F2 = C, C = K2, K2 = J2, J2 = H2 + u2 | 0, H2 = t, t = s2, s2 = D, D = u2 + O2 | 0;
      I2[0] += D, I2[1] += s2, I2[2] += t, I2[3] += H2, I2[4] += J2, I2[5] += K2, I2[6] += C, I2[7] += F2, A2 += 64, o2 -= 64;
    }
    return A2;
  }
  var oI = class {
    constructor() {
      this.digestLength = 32;
      this.blockSize = 64;
      this.state = new Int32Array(8);
      this.temp = new Int32Array(64);
      this.buffer = new Uint8Array(128);
      this.bufferLength = 0;
      this.bytesHashed = 0;
      this.finished = false;
      this.reset();
    }
    reset() {
      return this.state[0] = 1779033703, this.state[1] = 3144134277, this.state[2] = 1013904242, this.state[3] = 2773480762, this.state[4] = 1359893119, this.state[5] = 2600822924, this.state[6] = 528734635, this.state[7] = 1541459225, this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this;
    }
    clean() {
      for (let I2 = 0; I2 < this.buffer.length; I2++)
        this.buffer[I2] = 0;
      for (let I2 = 0; I2 < this.temp.length; I2++)
        this.temp[I2] = 0;
      this.reset();
    }
    update(I2, E = I2.length) {
      if (this.finished)
        throw new Error("SHA256: can't update because hash was finished.");
      let A2 = 0;
      if (this.bytesHashed += E, this.bufferLength > 0) {
        for (; this.bufferLength < 64 && E > 0; )
          this.buffer[this.bufferLength++] = I2[A2++], E--;
        this.bufferLength === 64 && (GI(this.temp, this.state, this.buffer, 0, 64), this.bufferLength = 0);
      }
      for (E >= 64 && (A2 = GI(this.temp, this.state, I2, A2, E), E %= 64); E > 0; )
        this.buffer[this.bufferLength++] = I2[A2++], E--;
      return this;
    }
    finish(I2) {
      if (!this.finished) {
        let E = this.bytesHashed, A2 = this.bufferLength, o2 = E / 536870912 | 0, D = E << 3, s2 = E % 64 < 56 ? 64 : 128;
        this.buffer[A2] = 128;
        for (let t = A2 + 1; t < s2 - 8; t++)
          this.buffer[t] = 0;
        this.buffer[s2 - 8] = o2 >>> 24 & 255, this.buffer[s2 - 7] = o2 >>> 16 & 255, this.buffer[s2 - 6] = o2 >>> 8 & 255, this.buffer[s2 - 5] = o2 >>> 0 & 255, this.buffer[s2 - 4] = D >>> 24 & 255, this.buffer[s2 - 3] = D >>> 16 & 255, this.buffer[s2 - 2] = D >>> 8 & 255, this.buffer[s2 - 1] = D >>> 0 & 255, GI(this.temp, this.state, this.buffer, 0, s2), this.finished = true;
      }
      for (let E = 0; E < 8; E++)
        I2[E * 4 + 0] = this.state[E] >>> 24 & 255, I2[E * 4 + 1] = this.state[E] >>> 16 & 255, I2[E * 4 + 2] = this.state[E] >>> 8 & 255, I2[E * 4 + 3] = this.state[E] >>> 0 & 255;
      return this;
    }
    digest() {
      let I2 = new Uint8Array(this.digestLength);
      return this.finish(I2), I2;
    }
    _saveState(I2) {
      for (let E = 0; E < this.state.length; E++)
        I2[E] = this.state[E];
    }
    _restoreState(I2, E) {
      for (let A2 = 0; A2 < this.state.length; A2++)
        this.state[A2] = I2[A2];
      this.bytesHashed = E, this.finished = false, this.bufferLength = 0;
    }
  };
  function OE(G2) {
    let I2 = new oI().update(G2), E = I2.digest();
    return I2.clean(), E;
  }

  // node_modules/@iden3/js-iden3-core/dist/browser/esm/index.js
  var s = Object.freeze({ ERRORS: { DATA_OVERFLOW: new Error("data does not fits SNARK size"), INCORRECT_ID_POSITION: new Error("incorrect ID position"), NO_ID: new Error("ID is not set"), INVALID_SUBJECT_POSITION: new Error("invalid subject position"), INCORRECT_MERKLIZED_POSITION: new Error("incorrect Merklize position"), NO_MERKLIZED_ROOT: new Error("Merklized root is not set"), NETWORK_NOT_SUPPORTED_FOR_DID: new Error("network in not supported for did"), UNSUPPORTED_BLOCKCHAIN_FOR_DID: new Error("not supported blockchain for did"), UNSUPPORTED_DID_METHOD: new Error("not supported DID method"), UNKNOWN_DID_METHOD: new Error("unknown DID method"), INCORRECT_DID: new Error("incorrect DID"), UNSUPPORTED_ID: new Error("unsupported Id") }, SCHEMA: { HASH_LENGTH: 16 }, ETH_ADDRESS_LENGTH: 20, BYTES_LENGTH: 32, ELEM_BYTES_LENGTH: 4, NONCE_BYTES_LENGTH: 8, Q: BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617"), ID: { TYPE_DEFAULT: Uint8Array.from([0, 0]), TYPE_READONLY: Uint8Array.from([0, 1]), ID_LENGTH: 31 }, DID: { DID_SCHEMA: "did" }, GENESIS_LENGTH: 27 });
  var o = { Ethereum: "eth", Polygon: "polygon", Privado: "privado", Linea: "linea", Unknown: "unknown", NoChain: "", ReadOnly: "readonly" };
  var a = { Main: "main", Mumbai: "mumbai", Amoy: "amoy", Goerli: "goerli", Sepolia: "sepolia", Zkevm: "zkevm", Cardona: "cardona", Test: "test", Unknown: "unknown", NoNetwork: "" };
  var h3 = { Iden3: "iden3", PolygonId: "polygonid", Other: "" };
  var l2 = { [`${o.Ethereum}:${a.Main}`]: 1, [`${o.Ethereum}:${a.Goerli}`]: 5, [`${o.Ethereum}:${a.Sepolia}`]: 11155111, [`${o.Polygon}:${a.Main}`]: 137, [`${o.Polygon}:${a.Mumbai}`]: 80001, [`${o.Polygon}:${a.Amoy}`]: 80002, [`${o.Polygon}:${a.Zkevm}`]: 1101, [`${o.Polygon}:${a.Cardona}`]: 2442, [`${o.Privado}:${a.Main}`]: 21e3, [`${o.Privado}:${a.Test}`]: 21001, [`${o.Linea}:${a.Main}`]: 59144, [`${o.Linea}:${a.Sepolia}`]: 59141 };
  var u = { [h3.Iden3]: 1, [h3.PolygonId]: 2, [h3.Other]: 255 };
  var c = { [`${o.ReadOnly}:${a.NoNetwork}`]: 0, [`${o.Polygon}:${a.Main}`]: 17, [`${o.Polygon}:${a.Mumbai}`]: 18, [`${o.Polygon}:${a.Amoy}`]: 19, [`${o.Polygon}:${a.Zkevm}`]: 20, [`${o.Polygon}:${a.Cardona}`]: 21, [`${o.Ethereum}:${a.Main}`]: 33, [`${o.Ethereum}:${a.Goerli}`]: 34, [`${o.Ethereum}:${a.Sepolia}`]: 35, [`${o.Privado}:${a.Main}`]: 161, [`${o.Privado}:${a.Test}`]: 162, [`${o.Linea}:${a.Main}`]: 73, [`${o.Linea}:${a.Sepolia}`]: 72 };
  var d2 = { [h3.Iden3]: { ...c }, [h3.PolygonId]: { ...c }, [h3.Other]: { [`${o.Unknown}:${a.Unknown}`]: 255 } };
  var I = new TextEncoder();
  function g(t) {
    const e3 = BigInt(256);
    let r = BigInt(0), n2 = BigInt(1);
    return t.forEach((t2) => {
      r += n2 * BigInt(t2), n2 *= e3;
    }), r;
  }
  function f2(t, e3 = 31) {
    const r = BigInt(256), n2 = new Uint8Array(e3);
    let i2 = 0;
    for (; t > BigInt(0); )
      n2[i2] = Number(t % r), t /= r, i2 += 1;
    return n2;
  }
  function x2(t) {
    return t < s.Q;
  }
  var O = class {
    static isNotValidIDChar(t) {
      return O.isNotAlpha(t) && O.isNotDigit(t) && "." !== t && "-" !== t;
    }
    static isNotValidParamChar(t) {
      return O.isNotAlpha(t) && O.isNotDigit(t) && "." !== t && "-" !== t && "_" !== t && ":" !== t;
    }
    static isNotValidQueryOrFragmentChar(t) {
      return O.isNotValidPathChar(t) && "/" !== t && "?" !== t;
    }
    static isNotValidPathChar(t) {
      return O.isNotUnreservedOrSubdelim(t) && ":" !== t && "@" !== t;
    }
    static isNotUnreservedOrSubdelim(t) {
      switch (t) {
        case "-":
        case ".":
        case "_":
        case "~":
        case "!":
        case "$":
        case "&":
        case "'":
        case "(":
        case ")":
        case "*":
        case "+":
        case ",":
        case ";":
        case "=":
          return false;
        default:
          return !(!O.isNotAlpha(t) || !O.isNotDigit(t));
      }
    }
    static isNotHexDigit(t) {
      return O.isNotDigit(t) && (t < "A" || t > "F") && (t < "a" || t > "f");
    }
    static isNotDigit(t) {
      return t < "0" || t > "9";
    }
    static isNotAlpha(t) {
      return O.isNotSmallLetter(t) && O.isNotBigLetter(t);
    }
    static isNotBigLetter(t) {
      return t < "A" || t > "Z";
    }
    static isNotSmallLetter(t) {
      return t < "a" || t > "z";
    }
  };
  var T2 = (t) => Uint8Array.from([...new Uint8Array(7), ...t]);
  var R2 = class {
    static intToBytes(t) {
      return R2.intToNBytes(t, s.BYTES_LENGTH);
    }
    static intToNBytes(t, e3) {
      return Uint8Array.from(f2(t, e3));
    }
    static checkChecksum(t) {
      const { typ: e3, genesis: r, checksum: n2 } = R2.decomposeBytes(t);
      if (!n2.length || JSON.stringify(Uint8Array.from([0, 0])) === JSON.stringify(n2))
        return false;
      const i2 = R2.calculateChecksum(e3, r);
      return JSON.stringify(i2) === JSON.stringify(n2);
    }
    static decomposeBytes(t) {
      const e3 = t.length - 2;
      return { typ: t.slice(0, 2), genesis: t.slice(2, e3), checksum: t.slice(-2) };
    }
    static calculateChecksum(t, e3) {
      const r = [...t, ...e3].reduce((t2, e4) => t2 + e4, 0), n2 = [r >> 8, 255 & r];
      return Uint8Array.from(n2.reverse());
    }
    static hashBytes(t) {
      const r = OE(I.encode(t));
      return new Uint8Array(r);
    }
    static hexToBytes(t) {
      return b.decodeString(t);
    }
    static bytesToHex(t) {
      const e3 = [];
      for (let r = 0; r < t.length; r++) {
        const n2 = t[r] < 0 ? t[r] + 256 : t[r];
        e3.push((n2 >>> 4).toString(16)), e3.push((15 & n2).toString(16));
      }
      return e3.join("");
    }
    static bytesToInt(t) {
      return g(t);
    }
  };
  var B2 = class {
    constructor(t) {
      if (this._bytes = new Uint8Array(s.BYTES_LENGTH), t && (this._bytes = t), this._bytes.length !== s.BYTES_LENGTH)
        throw new Error("Invalid bytes length");
    }
    get bytes() {
      return this._bytes;
    }
    set bytes(t) {
      this._bytes = t;
    }
    toBigInt() {
      return R2.bytesToInt(this._bytes);
    }
    setBigInt(t) {
      if (!x2(t))
        throw s.ERRORS.DATA_OVERFLOW;
      return this._bytes = R2.intToBytes(t), this;
    }
    slotFromHex(t) {
      const e3 = b.decodeString(t);
      if (e3.length !== s.BYTES_LENGTH)
        throw new Error("Invalid bytes length");
      return this._bytes.set(e3, 0), this;
    }
    hex() {
      return b.encodeString(this._bytes);
    }
    static elemBytesToInts(t) {
      const e3 = [];
      for (let r = 0; r < t.length; r++) {
        const n2 = t[r];
        e3.push(n2.toBigInt());
      }
      return e3;
    }
    static fromInt(t) {
      if (!x2(t))
        throw s.ERRORS.DATA_OVERFLOW;
      const e3 = R2.intToBytes(t);
      return new B2(e3);
    }
  };
  var k2 = class {
    constructor(t) {
      if (this._bytes = new Uint8Array(s.SCHEMA.HASH_LENGTH), t && (this._bytes = t), this.bytes.length !== s.SCHEMA.HASH_LENGTH)
        throw new Error(`Schema hash must be ${s.SCHEMA.HASH_LENGTH} bytes long`);
    }
    get bytes() {
      return this._bytes;
    }
    marshalTextBytes() {
      return b.encode(this.bytes);
    }
    marshalText() {
      return b.encodeString(this.bytes);
    }
    static newSchemaHashFromHex(t) {
      const e3 = b.decodeString(t);
      if (e3.length !== s.SCHEMA.HASH_LENGTH)
        throw new Error(`invalid schema hash length: ${e3.length}`);
      return new k2(e3);
    }
    static newSchemaHashFromInt(t) {
      const e3 = R2.intToNBytes(t, s.SCHEMA.HASH_LENGTH), r = s.SCHEMA.HASH_LENGTH - e3.length;
      return new k2(R2.intToBytes(t).slice(r, s.SCHEMA.HASH_LENGTH));
    }
    bigInt() {
      return R2.bytesToInt(this.bytes);
    }
  };
  k2.authSchemaHash = new k2(Uint8Array.from([204, 163, 55, 26, 108, 177, 183, 21, 0, 68, 7, 227, 37, 189, 153, 60]));
  var $2 = class {
    constructor(t, e3) {
      this._checksum = R2.calculateChecksum(t, e3), this._bytes = Uint8Array.from([...t, ...e3, ...this._checksum]);
    }
    static getFromBytes(t) {
      const { typ: e3, genesis: r } = R2.decomposeBytes(t);
      return new $2(e3, r);
    }
    checksum() {
      return this._checksum;
    }
    string() {
      return uE(this._bytes);
    }
    get bytes() {
      return this._bytes;
    }
    set bytes(t) {
      this._bytes = t;
    }
    type() {
      return this._bytes.slice(0, 2);
    }
    bigInt() {
      return g(this._bytes);
    }
    equal(t) {
      return JSON.stringify(this._bytes) === JSON.stringify(t.bytes);
    }
    marshal() {
      return new TextEncoder().encode(this.string());
    }
    static unMarshal(t) {
      return $2.fromString(new TextDecoder().decode(t));
    }
    static fromBytes(t) {
      const e3 = t ?? Uint8Array.from([]);
      if (e3.length !== s.ID.ID_LENGTH)
        throw new Error("fromBytes error: byte array incorrect length");
      if (e3.every((t2) => 0 === t2))
        throw new Error("fromBytes error: byte array empty");
      const r = $2.getFromBytes(e3);
      if (!R2.checkChecksum(e3))
        throw new Error("fromBytes error: checksum error");
      return r;
    }
    static fromString(t) {
      const e3 = yE(t);
      return $2.fromBytes(e3);
    }
    static fromBigInt(t) {
      const e3 = R2.intToNBytes(t, s.ID.ID_LENGTH);
      return $2.fromBytes(e3);
    }
    static profileId(e3, r) {
      const n2 = $.hash([e3.bigInt(), r]), { typ: i2 } = R2.decomposeBytes(e3.bytes), s2 = R2.intToNBytes(n2, 27);
      return new $2(i2, s2);
    }
    static idGenesisFromIdenState(t, e3) {
      const r = B2.fromInt(e3), n2 = r.bytes.slice(r.bytes.length - 27);
      return new $2(t, n2);
    }
    static ethAddressFromId(t) {
      if (!t.bytes.slice(2, 9).every((t2) => 0 === t2))
        throw new Error("can't get Ethereum address: high bytes of genesis are not zero");
      return t.bytes.slice(9).slice(0, s.ETH_ADDRESS_LENGTH);
    }
  };
  var H;
  var A;
  var U3;
  var v2;
  var V2;
  var L2;
  !function(t) {
    t.IndexA = "IndexA", t.IndexB = "IndexB", t.ValueA = "ValueA", t.ValueB = "ValueB";
  }(H || (H = {}));
  !function(t) {
    t[t.Self = 0] = "Self", t[t.Invalid = 1] = "Invalid", t[t.OtherIdenIndex = 2] = "OtherIdenIndex", t[t.OtherIdenValue = 3] = "OtherIdenValue";
  }(A || (A = {})), function(t) {
    t[t.None = 0] = "None", t[t.Index = 1] = "Index", t[t.Value = 2] = "Value";
  }(U3 || (U3 = {})), function(t) {
    t[t.None = 0] = "None", t[t.Index = 32] = "Index", t[t.Value = 64] = "Value", t[t.Invalid = 128] = "Invalid";
  }(v2 || (v2 = {})), function(t) {
    t[t.None = 0] = "None", t[t.Index = 1] = "Index", t[t.Value = 2] = "Value";
  }(V2 || (V2 = {})), function(t) {
    t[t.ByteIdx = 16] = "ByteIdx", t[t.ExpirationBitIdx = 3] = "ExpirationBitIdx", t[t.UpdatableBitIdx = 4] = "UpdatableBitIdx";
  }(L2 || (L2 = {}));
  var F = class {
    constructor(t, e3) {
      this.blockchain = t, this.networkId = e3;
    }
    toString() {
      return `${this.blockchain}:${this.networkId}`;
    }
    static fromString(t) {
      const [e3, r] = t.split(":");
      return new F(e3.replace("_", ""), r.replace("_", ""));
    }
  };
  function G(t, e3, r) {
    const n2 = u[t];
    if (!n2)
      throw s.ERRORS.UNSUPPORTED_DID_METHOD;
    const i2 = d2[t];
    if (!i2)
      throw s.ERRORS.NETWORK_NOT_SUPPORTED_FOR_DID;
    const o2 = i2[new F(e3, r).toString()];
    if ("number" != typeof o2)
      throw new Error(`blockchain ${e3.toString() ?? "-"} and network ${r.toString() ?? "-"} is not defined in core lib`);
    return Uint8Array.from([n2, o2]);
  }
  function z2(t, e3) {
    const r = d2[t];
    if (!r)
      throw s.ERRORS.UNSUPPORTED_DID_METHOD;
    for (const [t2, n2] of Object.entries(r))
      if (n2 === e3)
        return F.fromString(t2).networkId;
    throw s.ERRORS.NETWORK_NOT_SUPPORTED_FOR_DID;
  }
  function Y2(t, e3) {
    const r = d2[t];
    if (!r)
      throw new Error(`${s.ERRORS.NETWORK_NOT_SUPPORTED_FOR_DID}: did method ${t} is not defined in core lib`);
    for (const [t2, n2] of Object.entries(r))
      if (n2 === e3)
        return F.fromString(t2).blockchain;
    throw s.ERRORS.UNSUPPORTED_BLOCKCHAIN_FOR_DID;
  }
  function j2(t) {
    for (const [e3, r] of Object.entries(u))
      if (r === t)
        return e3;
    throw s.ERRORS.UNSUPPORTED_DID_METHOD;
  }
  var K = class {
    constructor(t, e3) {
      this.name = t, this.value = e3;
    }
    toString() {
      return this.name ? this.value ? `${this.name}=${this.value}` : this.name : "";
    }
  };
  var J = Object.freeze({ method: "", id: "", idStrings: [], params: [], path: "", pathSegments: [], query: "", fragment: "" });
  var W2 = class {
    constructor(t) {
      this.input = t, this.currentIndex = 0, this.out = { ...J };
    }
    checkLength() {
      if (this.input.length < 7)
        throw new Error("input length is less than 7");
      return this.parseScheme.bind(this);
    }
    parseScheme() {
      if ("did:" !== this.input.slice(0, 4))
        throw new Error("input does not begin with 'did:' prefix");
      return this.currentIndex = 3, this.parseMethod.bind(this);
    }
    parseMethod() {
      const t = this.input, e3 = t.length;
      let r = this.currentIndex + 1;
      const n2 = r;
      for (; ; ) {
        if (r === e3)
          throw new Error("input does not have a second `:` marking end of method name");
        const i2 = t[r];
        if (":" === i2) {
          if (r === n2)
            throw new Error(`method is empty, ${r}`);
          break;
        }
        if (O.isNotDigit(i2) && O.isNotSmallLetter(i2))
          throw new Error(`"character is not a-z OR 0-9, ${r}`);
        r += 1;
      }
      return this.currentIndex = r, this.out.method = t.slice(n2, r), this.parseId.bind(this);
    }
    parseId() {
      const t = this.input, e3 = t.length;
      let r = this.currentIndex + 1;
      const n2 = r;
      let i2 = null;
      for (; ; ) {
        if (r === e3) {
          i2 = null;
          break;
        }
        const n3 = t[r];
        if (":" === n3) {
          i2 = this.parseId;
          break;
        }
        if (";" === n3) {
          i2 = this.parseParamName;
          break;
        }
        if ("/" === n3) {
          i2 = this.parsePath;
          break;
        }
        if ("?" === n3) {
          i2 = this.parseQuery;
          break;
        }
        if ("#" === n3) {
          i2 = this.parseFragment;
          break;
        }
        if (O.isNotValidIDChar(n3))
          throw new Error(`byte is not ALPHA OR DIGIT OR '.' OR '-', ${r}`);
        r += 1;
      }
      if (r === n2)
        throw new Error(`idstring must be at least one char long, ${r}`);
      return this.currentIndex = r, this.out.idStrings = [...this.out.idStrings, t.slice(n2, r)], i2 ? i2.bind(this) : null;
    }
    parseParamName() {
      const t = this.input, e3 = this.currentIndex + 1, r = this.paramTransition(), n2 = this.currentIndex;
      if (n2 === e3)
        throw new Error(`Param name must be at least one char long, ${n2}`);
      return this.out.params = [...this.out.params, new K(t.slice(e3, n2), "")], r ? r.bind(this) : null;
    }
    parseParamValue() {
      const t = this.input, e3 = this.currentIndex + 1, r = this.paramTransition(), n2 = this.currentIndex;
      return this.out.params[this.out.params.length - 1].value = t.slice(e3, n2), r ? r.bind(this) : null;
    }
    paramTransition() {
      const t = this.input, e3 = t.length;
      let r, n2, i2, s2 = this.currentIndex + 1;
      for (; ; ) {
        if (s2 === e3) {
          n2 = null;
          break;
        }
        const o2 = t[s2];
        if (";" === o2) {
          n2 = this.parseParamName;
          break;
        }
        if ("=" === o2) {
          n2 = this.parseParamValue;
          break;
        }
        if ("/" === o2) {
          n2 = this.parsePath;
          break;
        }
        if ("?" === o2) {
          n2 = this.parseQuery;
          break;
        }
        if ("#" == o2) {
          n2 = this.parseFragment;
          break;
        }
        if ("%" == o2) {
          if (s2 + 2 >= e3 || O.isNotHexDigit(t[s2 + 1]) || O.isNotHexDigit(t[s2 + 2]))
            throw new Error(`% is not followed by 2 hex digits', ${s2}`);
          i2 = true, r = 3;
        } else
          i2 = false, r = 1;
        if (!i2 && O.isNotValidParamChar(o2))
          throw new Error(`character is not allowed in param - ${o2}',  ${s2}`);
        s2 += r;
      }
      return this.currentIndex = s2, n2 ? n2.bind(this) : null;
    }
    parsePath() {
      const t = this.input, e3 = t.length;
      let r = this.currentIndex + 1;
      const n2 = r;
      let i2, s2, o2;
      for (; ; ) {
        if (r === e3) {
          s2 = null;
          break;
        }
        const n3 = t[r];
        if ("/" === n3) {
          s2 = this.parsePath;
          break;
        }
        if ("?" === n3) {
          s2 = this.parseQuery;
          break;
        }
        if ("%" === n3) {
          if (r + 2 >= e3 || O.isNotHexDigit(t[r + 1]) || O.isNotHexDigit(t[r + 2]))
            throw new Error(`% is not followed by 2 hex digits, ${r}`);
          o2 = true, i2 = 3;
        } else
          o2 = false, i2 = 1;
        if (!o2 && O.isNotValidPathChar(n3))
          throw new Error(`character is not allowed in path, ${r}`);
        r += i2;
      }
      if (r == n2 && 0 === this.out.pathSegments.length)
        throw new Error(`first path segment must have at least one character, ${r}`);
      return this.currentIndex = r, this.out.pathSegments = [...this.out.pathSegments, t.slice(n2, r)], s2 ? s2.bind(this) : null;
    }
    parseQuery() {
      const t = this.input, e3 = t.length;
      let r = this.currentIndex + 1;
      const n2 = r;
      let i2, s2, o2 = null;
      for (; r !== e3; ) {
        const n3 = t[r];
        if ("#" === n3) {
          o2 = this.parseFragment;
          break;
        }
        if ("%" === n3) {
          if (r + 2 >= e3 || O.isNotHexDigit(t[r + 1]) || O.isNotHexDigit(t[r + 2]))
            throw new Error(`% is not followed by 2 hex digits, ${r}`);
          s2 = true, i2 = 3;
        } else
          s2 = false, i2 = 1;
        if (!s2 && O.isNotValidQueryOrFragmentChar(n3))
          throw new Error(`character is not allowed in query - ${n3}`);
        r += i2;
      }
      return this.currentIndex = r, this.out.query = t.slice(n2, r), o2 ? o2.bind(this) : null;
    }
    parseFragment() {
      const t = this.input, e3 = this.input.length;
      let r = this.currentIndex + 1;
      const n2 = r;
      let i2, s2;
      for (; r !== e3; ) {
        const n3 = t[r];
        if ("%" === n3) {
          if (r + 2 >= e3 || O.isNotHexDigit(t[r + 1]) || O.isNotHexDigit(t[r + 2]))
            throw new Error(`% is not followed by 2 hex digits, ${r}`);
          s2 = true, i2 = 3;
        } else
          s2 = false, i2 = 1;
        if (!s2 && O.isNotValidQueryOrFragmentChar(n3))
          throw new Error(`character is not allowed in fragment - ${n3}`);
        r += i2;
      }
      return this.currentIndex = r, this.out.fragment = t.slice(n2, r), null;
    }
  };
  var Q2 = class {
    constructor(t) {
      this.method = "", this.id = "", this.idStrings = [], this.params = [], this.path = "", this.pathSegments = [], this.query = "", this.fragment = "", t && Object.assign(this, t);
    }
    isUrl() {
      return this.params.length > 0 || !!this.path || this.pathSegments.length > 0 || !!this.query || !!this.fragment;
    }
    string() {
      const t = ["did:"];
      if (!this.method)
        return "";
      if (t.push(`${this.method}:`), this.id)
        t.push(this.id);
      else {
        if (!this.idStrings.length)
          return "";
        t.push(this.idStrings.join(":"));
      }
      if (this.params.length)
        for (const e3 of this.params) {
          const r = e3.toString();
          if (!r)
            return "";
          t.push(`;${r}`);
        }
      return this.path ? t.push(`/${this.path}`) : this.pathSegments.length && t.push(`/${this.pathSegments.join("/")}`), this.query && t.push(`?${this.query}`), this.fragment && t.push(`#${this.fragment}`), t.join("");
    }
    toJSON() {
      return this.string();
    }
    static parse(t) {
      const e3 = new W2(t);
      let r = e3.checkLength();
      for (; r; )
        r = r();
      return e3.out.id = e3.out.idStrings.join(":"), e3.out.path = e3.out.pathSegments.join("/"), new Q2(e3.out);
    }
    static decodePartsFromId(t) {
      const e3 = j2(t.bytes[0]);
      return { method: e3, blockchain: Y2(e3, t.bytes[1]), networkId: z2(e3, t.bytes[1]) };
    }
    static networkIdFromId(t) {
      return Q2.throwIfDIDUnsupported(t).networkId;
    }
    static methodFromId(t) {
      return Q2.throwIfDIDUnsupported(t).method;
    }
    static blockchainFromId(t) {
      return Q2.throwIfDIDUnsupported(t).blockchain;
    }
    static throwIfDIDUnsupported(t) {
      const { method: e3, blockchain: r, networkId: n2 } = Q2.decodePartsFromId(t);
      if (Q2.isUnsupported(e3, r, n2))
        throw new Error(`${s.ERRORS.UNKNOWN_DID_METHOD.message}: unsupported DID`);
      return { method: e3, blockchain: r, networkId: n2 };
    }
    static newFromIdenState(t, e3) {
      const r = $2.idGenesisFromIdenState(t, e3);
      return Q2.parseFromId(r);
    }
    static new(t, e3) {
      return Q2.parseFromId(new $2(t, e3));
    }
    static parseFromId(t) {
      if (!R2.checkChecksum(t.bytes))
        throw new Error(`${s.ERRORS.UNSUPPORTED_ID.message}: invalid checksum`);
      const { method: e3, blockchain: r, networkId: n2 } = Q2.throwIfDIDUnsupported(t), i2 = [s.DID.DID_SCHEMA, e3.toString(), r.toString()];
      n2 && i2.push(n2.toString()), i2.push(t.string());
      const o2 = i2.join(":");
      return Q2.parse(o2);
    }
    static idFromDID(t) {
      let e3;
      try {
        e3 = Q2.getIdFromDID(t);
      } catch (e4) {
        if (e4.message === s.ERRORS.UNKNOWN_DID_METHOD.message)
          return Q2.idFromUnsupportedDID(t);
        throw e4;
      }
      return e3;
    }
    static isUnsupported(t, e3, r) {
      return t == h3.Other && e3 == o.Unknown && r == a.Unknown;
    }
    static idFromUnsupportedDID(t) {
      const r = OE(I.encode(t.string())), n2 = new Uint8Array(27), i2 = r.slice(r.length - s.GENESIS_LENGTH);
      for (let t2 = 0; t2 < n2.length; t2++)
        n2[t2] = i2[t2] ?? 0;
      const l3 = new F(o.Unknown, a.Unknown), c2 = Uint8Array.from([u[h3.Other], d2[h3.Other][l3.toString()]]);
      return new $2(c2, n2);
    }
    static getIdFromDID(t) {
      const e3 = t.method;
      if (!u[e3] || e3 === h3.Other)
        throw s.ERRORS.UNKNOWN_DID_METHOD;
      if (t.idStrings.length > 3 || t.idStrings.length < 2)
        throw new Error(`${s.ERRORS.INCORRECT_DID}: unexpected number of ID strings`);
      const r = $2.fromString(t.idStrings[t.idStrings.length - 1]);
      if (!R2.checkChecksum(r.bytes))
        throw new Error(`${s.ERRORS.INCORRECT_DID}: incorrect ID checksum`);
      const { method: n2, blockchain: i2, networkId: o2 } = Q2.decodePartsFromId(r);
      if (n2.toString() !== e3.toString())
        throw new Error(`${s.ERRORS.INCORRECT_DID}: methods in Id and DID are different`);
      if (i2.toString() !== t.idStrings[0])
        throw new Error(`${s.ERRORS.INCORRECT_DID}: blockchains in ID and DID are different`);
      if (t.idStrings.length > 2 && o2.toString() != t.idStrings[1])
        throw new Error(`${s.ERRORS.INCORRECT_DID}: networkIDs in Id and DID are different`);
      return r;
    }
  };

  // src/privado.js
  (async () => {
    try {
      const didType = G(
        h3.Iden3,
        o.Polygon,
        a.Amoy
      );
      const genesis = T2(ethers.utils.arrayify(ethAddress));
      const identifier = new $2(didType, genesis);
      const did = Q2.parseFromId(identifier);
      await LitActions.ethPersonalSignMessageEcdsa({
        message: msgToSign,
        publicKey,
        sigName: "sig"
      });
      const response = JSON.stringify(
        {
          did: did.string(),
          signedMessage: msgToSign
        },
        null,
        2
      );
      LitActions.setResponse({
        response
      });
    } catch (error) {
      console.log("Error");
    }
  })();
})();