<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMAILER\Exception.php'; // Include PHPMailer via Composer
require 'PHPMAILER\PHPMailer.php'; 
require 'PHPMAILER\SMTP.php'; 

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get form input and sanitize
    $companyName = htmlspecialchars($_POST['company-name'] ?? '', ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8');

    if (!$email) {
        // Send a response if the email is invalid
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);
    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'om313989@gmail.com'; // Replace with your SMTP username
        $mail->Password = 'vpns lhlx ntkl sqfr';          // Replace with your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Replace with your SMTP port, usually 587 or 465 for SSL

        // Email headers
        $mail->setFrom('om313989@gmail.com', 'Contact Form');
        $mail->addAddress('prajapatiok1011@gmail.com', 'WebSite'); // Recipient email address

        // Email content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = "Contact Us Form";
        $mail->Body = "Company Name: $companyName\nEmail: $email\nPhone: $phone\nMessage: $message";

        // Attempt to send the email
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } catch (Exception $e) {
        // Output error if email sending fails
        echo json_encode(['success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    // If not a POST request, respond with an error
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
