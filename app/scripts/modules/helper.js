Math.map = (value, istart, istop, ostart, ostop) => {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

Math.constrain = (amt, low, high) => {
  return (amt < low) ? low : ((amt > high) ? high : amt);
};

Math.getRadian = (degrees) => {
  return degrees * Math.PI / 180;
};
