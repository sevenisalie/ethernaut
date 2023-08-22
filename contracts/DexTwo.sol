//   function swap(address from, address to, uint amount) public {
//     require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
//     uint swapAmount = getSwapAmount(from, to, amount);
//     IERC20(from).transferFrom(msg.sender, address(this), amount);
//     IERC20(to).approve(address(this), swapAmount);
//     IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
//   } 


//   function swap(address from, address to, uint amount) public {
//     require((from == token1 && to == token2) || (from == token2 && to == token1), "Invalid tokens");
//     require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
//     uint swapAmount = getSwapPrice(from, to, amount);
//     IERC20(from).transferFrom(msg.sender, address(this), amount);
//     IERC20(to).approve(address(this), swapAmount);
//     IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
//   }