import java.util.Scanner;

public class Spiral {
  public static int[][] spiral(int n) {
    int[][] arr = new int[n][n];

    int ROW_START = 0;
    int ROW_END = n - 1;
    int COL_START = 0;
    int COL_END = n - 1;

    int counter = 1;

    String direction = "L2R"; // left to right

    while (ROW_END >= ROW_START || COL_END >= COL_START) {

      switch (direction) {
        case "L2R": {
          /*
           * traverses the starting row from left to right and then increase
           * the starting row index by 1
           */
          for (int j = COL_START; j <= COL_END; j++) {
            arr[ROW_START][j] = counter++;
          }
          direction = "U2D"; // up to down
          ROW_START++;
          break;
        }
        case "U2D": {
          /*
           * traverses the let col from up to down and then decrease
           * the last column index by 1
           */
          for (int i = ROW_START; i <= ROW_END; i++) {
            arr[i][COL_END] = counter++;
          }
          direction = "R2L"; // right to left
          COL_END--;
          break;
        }
        case "R2L": {
          /*
           * traverses the ending row from right to left and then decreases
           * the ending row index by 1
           */
          for (int j = COL_END; j >= COL_START; j--) {
            arr[ROW_END][j] = counter++;
          }
          direction = "D2U"; // down to up
          ROW_END--;
          break;
        }
        case "D2U": {
          /*
           * traverses the starting col from down to up and then increases
           * the starting column index by 1
           */
          for (int i = ROW_END; i >= ROW_START; i--) {
            arr[i][COL_START] = counter++;
          }
          direction = "L2R"; // left to right
          COL_START++;
          break;
        }
      }
    }
    print2DArray(arr);
    return arr;
  }

  /*
   * function to print the array in nice format such that all the numbers have
   * same
   * number of digits
   */
  static void print2DArray(int[][] arr) {
    int n = arr[0].length;
    int numOfDigits = getNumOfDigits(n * n);

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        System.out.print(String.format("%0" + numOfDigits + "d", arr[i][j]) + " ");
      }
      System.out.println();
    }
  }

  // Returns the number of digits in a number
  public static int getNumOfDigits(int num) {
    return Integer.toString(num).length();
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n;
    System.out.print("Enter the size of array:  ");
    n = sc.nextInt();
    spiral(n);
  }
}
