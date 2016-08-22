Math.map = (value, istart, istop, ostart, ostop) => {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};
Math.constrain = (amt, low, high) => {
  return (amt < low) ? low : ((amt > high) ? high : amt);
};

// import './chapter0/';
// import './chapter1/';
// import './chapter1/example1_3/';
// import './chapter2/';
// import './chapter3/';
// import './chapter3/example3_7';
// import './chapter3/example3_8';
// import './chapter3/example3_10';
// import './chapter3/example3_11';
// import './chapter4/example1/';
// import './chapter5/';
// import './chapter5/index5_8';
// import './chapter5/index5_9';
// import './chapter5/toxiclibs/';
// import './chapter5/toxiclibsNode/';
import './chapter5/toxiclibsForce/';
