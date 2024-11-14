<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        try {
            // Insert data into newsletter_subscribers table
            $stmt = $conn->prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)");
            $stmt->bind_param("s", $email);

            if ($stmt->execute()) {
                header("Location: ../frontend/html/success.html");
                exit();
            }
            $stmt->close();
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                $error = urlencode("duplicate");
            } else {
                $error = urlencode("An error occurred. Please try again.");
            }
            header("Location: ../frontend/html/reject.html?error=$error");
            exit();
        }
    } else {
        header("Location: ../frontend/html/reject.html?error=" . urlencode("invalid_email"));
        exit();
    }
}

$conn->close();
?>
