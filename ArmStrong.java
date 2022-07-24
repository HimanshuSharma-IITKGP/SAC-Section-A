import java.util.Scanner;


public class ArmStrong {

  //prints all the armstrong numbers in [1,n] inclusive 
  public static void printArmstrongNumbers(int n) {
    for (int num = 1; num <= n; num++) {
      if (isArmStrong(num)) {
        System.out.println(num);
      }
    }
  }

  // Given a number checks if it is an Armstrong number
  public static boolean isArmStrong(int num) {
    int orgNum = num;
    int numOfDigits = getNumOfDigits(num);

    int sum = 0;
    while (num > 0) {
      sum += Math.pow(num % 10, numOfDigits);
      num /= 10;
    }

    return orgNum == sum;
  }

  // Returns the number of digits in a number
  public static int getNumOfDigits(int num) {
    return Integer.toString(num).length();
  }
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n;
    System.out.print("Enter the Range:  ");
    n = sc.nextInt();
    printArmstrongNumbers(n);
  }
}