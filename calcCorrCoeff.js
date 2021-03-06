function correlationCoefficient(X2d, Y2d, n){
    var X = [], Y = [];
    for(var i = 0; i < X2d.length; i++){
        X.push(X2d[i][1]); // array X[] should only contain price, not date
        Y.push(Y2d[i][1]);
    }
    let sum_X = 0, sum_Y = 0, sum_XY = 0;
    let squareSum_X = 0, squareSum_Y = 0;
     
    for(let i = 0; i < n; i++){
          
        // Sum of elements of array X.
        sum_X = sum_X + X[i];
     
        // Sum of elements of array Y.
        sum_Y = sum_Y + Y[i];
     
        // Sum of X[i] * Y[i].
        sum_XY = sum_XY + X[i] * Y[i];
     
        // Sum of square of array elements.
        squareSum_X = squareSum_X + X[i] * X[i];
        squareSum_Y = squareSum_Y + Y[i] * Y[i];
    }
     
    // Use formula for calculating correlation coefficient
    let corr = (n * sum_XY - sum_X * sum_Y)/
               (Math.sqrt((n * squareSum_X -
                       sum_X * sum_X) * 
                          (n * squareSum_Y - 
                       sum_Y * sum_Y)));
     
    return corr;
}

// Last Observation Carried Forward
function LOCF(arr1, arr2){
  
  for(var i = 0, j=0; i < arr1.length; i++, j++){
      
      if(arr1[i][0] != arr2[j][0]){ //5/28 != 5/31 
          arr2.splice(j, 0, [arr1[i][0], arr2[j-1][1]]); // insert
          //console.log("inserted " + [arr1[i][0], arr2[j-1][1]])
      }
      if(j == arr2.length - 1 && j < arr1.length -1){//  console.log("j: " + j);last iteration (?)
          //arr2.splice(j, 0, [arr1[i][0], arr2[j-1][1]]);
          arr2.push([arr1[i+1][0], arr2[j][1]]);//i+1
          //console.log("pushed "+ [arr1[i+1][0], arr2[j][1]])
      }
      //console.log(arr1.length+": "+ arr1[i][0] + " " +arr2.length+": "+  arr2[i][0]); 
  }
}

var exportObjects = {correlationCoefficient, LOCF}
module.exports = exportObjects;