<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        try {
            // Insert data into contact_inquiries table
            $stmt = $conn->prepare("INSERT INTO contact_inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $email, $phone, $message);

            if ($stmt->execute()) {
                header("Location: ../success.html");
                exit();
            }
            $stmt->close();
        } catch (mysqli_sql_exception $e) {
            // Check if error is due to duplicate entry
            if ($e->getCode() == 1062) {
                $error = urlencode("duplicate");
            } else {
                $error = urlencode("An error occurred. Please try again.");
            }
            header("Location: ../reject.html?error=$error");
            exit();
        }
    } else {
        header("Location: ../reject.html?error=" . urlencode("invalid_email"));
        exit();
    }
}

$conn->close();
?>
