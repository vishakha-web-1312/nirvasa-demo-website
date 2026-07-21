while True:

    num1 = float(input("Enter First Number: "))
    num2 = float(input("Enter Second Number: "))

    print("------ Calculator ------")
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")

    choice = int(input("Choose an option (1-4): "))

    if choice == 1:
        print("Answer =", num1 + num2)

    elif choice == 2:
        print("Answer =", num1 - num2)

    elif choice == 3:
        print("Answer =", num1 * num2)

    elif choice == 4:
        if num2 != 0:
            print("Answer =", num1 / num2)
        else:
            print("Cannot divide by zero")

    else:
        print("Invalid Choice")

    again = input("Do you want to continue? (y/n): ")

    if again == "n":
        break