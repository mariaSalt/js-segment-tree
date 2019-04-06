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

    if (array.length){
        return function(from, to){
            if (from===to){
                // console.log('from===to');
                return N;

            }
            if (from<0 || from >= array.length  )
                throw new Error ("error ") ;
            if (to>array.length|| to<0)
                throw new Error ("error ") ;

            if (from>to)
                throw new Error ("error ") ;
            let currentTree=[];
            function build(arr, data, tl, tr, v){
                if (tl === tr){
                    data[v] = arr[tl];
                    return;
                }else{
                    let tm = Math.floor((tl + tr) / 2);
                    // let left = 2 * v + 1;
                    // let right = 2 * v + 2;
                    build(arr, data, tl, tm, 2 * v + 1);
                    build(arr, data, tm + 1, tr,  2 * v + 2);
                    data[v] = fn(data[2 * v + 1], data[2 * v + 2]);
                }
            }
            build(array,currentTree, 0, array.length - 1, 0);

            // console.log('Текущее дерево ' + currentTree);
            function query(v, vl, vr, l, r){
                if(r < vl || vr < l)
                // if (l > r)
                    return N;
                if (l <= vl && vr <= r)
                    return currentTree[v];
                let vm = vl + (vr - vl) / 2;
                let ql = query (v * 2 + 1, vl, vm, l,r);
                let qr = query (v * 2 + 2, vm + 1, vr, l, r);
                return fn(ql,qr);
            }
            return query(0, 0, array.length, from, to);
        }
    }else{
        return neutralTree(N);
    }
}




//fn(result[tl],N)



function recursiveSegmentTree(array, fn, N) {

    let ini_seg =[];

    let fin_seg = [];

    function segment( low, high, pos, int, strip)
    {
        if (high === low) {
            ini_seg[strip][pos] = array[strip][low];
        }
        else {
            let mid = (low + high) / 2;
            segment(low, mid, 2 * pos, strip);
            segment(mid + 1, high, 2 * pos + 1, strip);
            ini_seg[strip][pos] = fn (ini_seg[strip][2 * pos], ini_seg[strip][2 * pos + 1]);
        }
    }

    function finalSegment(low, high, pos)
    {
        if (high === low) {

            for (let i = 1; i < 2 * size; i++)
            fin_seg[pos][i] = ini_seg[low][i];
        }
        else {
            let mid = (low + high) / 2;
            finalSegment(low, mid, 2 * pos);
            finalSegment(mid + 1, high, 2 * pos + 1);

            for (let i = 1; i < 2 * size; i++)
            fin_seg[pos][i] = fin_seg[2 * pos][i] +
                fin_seg[2 * pos + 1][i];
        }
    }


    function finalQuery (pos, start, end, x1, x2, node)
    {
        if (x2 < start || end < x1) {
            return 0;
        }

        if (x1 <= start && end <= x2) {
            return fin_seg[node][pos];
        }

        let mid = (start + end) / 2;
        let p1 = finalQuery(2 * pos, start, mid, x1, x2, node);
        let p2 = finalQuery(2 * pos + 1, mid + 1, end, x1, x2, node);

        return fn (p1, p2);
    }


    function query (pos, start, end, y1, y2, x1, x2)
    {
        if (y2 < start || end < y1) {
            return 0;
        }

        if (y1 <= start && end <= y2) {
            return (finalQuery(1, 1, 4, x1, x2, pos));
        }

        let mid = (start + end) / 2;
        let p1 = query(2 * pos, start,
        mid, y1, y2, x1, x2);
        let p2 = query(2 * pos + 1, mid + 1, end, y1, y2, x1, x2);

        return fn (p1, p2);
    }

    let pos=1;
    let low=0;
    let high=3;

    for (let strip = 0; strip < size ; strip++)
    segment(low, high, 1, strip);

    finalSegment( low, high, 1);

    return function(fromx, tox)(fromy, toy){}


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