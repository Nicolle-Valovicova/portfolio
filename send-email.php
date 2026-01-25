<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$company = $_POST["company"];
$name = $_POST["name"];
$secName = $_POST["secName"];
$email = ["email"];
$message = $_POST["message"];

require "Vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->SMTPAuth   = true;

$mail->Host       = 'mail.dmnic.nl';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;

$mail->Username   = 'contact@dmnic.nl';
$mail->Password   = '769W2ahqFMzmzzAj8rFq';

$mail->setFrom($email, $name);
$mail->addAddress("contact@dmnic.nl", "DMNIC");

$mail->Subject = 'New contact form message';

$mail->Body = "
Name: $firstName $secondName
Company: $company
Email: $email

Message:
$message
";

$mail->send();

echo "Email sent";