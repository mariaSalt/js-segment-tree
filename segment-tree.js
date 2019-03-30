function dummySegmentTree(array, fn, N) {
  return function (from, to) {
    let result = N;

    for (let i = from; i < to; i++) {
      result = fn(result, array[i]);
    }

    return result;
  }
}



function segmentTree(array, fn, N) {
    if (array.length)
      {
          return function(from, to)
          {
              if (from===to)
              {
                  return N;
              }
              if (from > to || from>=array.length || to>=array.length || from>=0 || to>=0)
              {
                  throw new Error ("error ") ;
              }

              let segmentize = function (original, data, tl, tr, v)
              {
                  if (tl === tr)
                  {
                      data[v] = original[tl];
                  }
                  else
                      {
                          let mid = Math.floor((tl + tr) / 2);
                          let left = 2 * v + 1;
                          let right = 2 * v + 2;
                          segmentize(original, data, tl, mid, left);
                          segmentize(original, data, mid + 1, tr, right);
                          data[v] = fn(data[left], data[right]);
                      }
              };
              let result=[];
              return segmentize(array, result, from, to-1, 0)}
      }
      else
          {
            return neutralTree(N);
          }
};

//fn(result[tl],N)



function recursiveSegmentTree(array, fn, N) {
  return segmentTree(array, fn, N);
}

function getElfTree(array) {
  return recursiveSegmentTree(array, sum, 0);
}

function assignEqually(tree, wishes, stash, elves, gems, week) {
  return {};
}

function assignAtLeastOne(tree, wishes, stash, elves, gems, week) {
  return {};
}

function assignPreferredGems(tree, wishes, stash, elves, gems) {
  return {};
}

function nextState(state, assignment, elves, gems) {
  return state;
}