function mincost(arr) {
  let totalCost = 0;

  // Sort the array of rope lengths in ascending order
  arr.sort((a, b) => a - b);

  while (arr.length > 1) {
    // Connect the two smallest ropes
    const first = arr.shift();
    const second = arr.shift();
    const combinedLength = first + second;

    // Add the cost of connecting the two smallest ropes to the total cost
    totalCost += combinedLength;

    // Insert the combined rope length back into the array
    // and maintain the sorted order
    let insertIndex = 0;
    while (insertIndex < arr.length && arr[insertIndex] < combinedLength) {
      insertIndex++;
    }
    arr.splice(insertIndex, 0, combinedLength);
  }

  return totalCost;
}

// Test cases
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33
