<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $company   = htmlspecialchars($_POST["company"] ?? '');
  $firstName = htmlspecialchars($_POST["name"] ?? '');
  $lastName  = htmlspecialchars($_POST["secName"] ?? '');
  $email     = htmlspecialchars($_POST["email"] ?? '');
  $message   = htmlspecialchars($_POST["message"] ?? '');

  // Validate BEFORE sending
  if (empty($firstName) || empty($lastName) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit();
  header("location: index.html#contact");
  }

  $mail = new PHPMailer(true);

  $mail->isSMTP();
  $mail->Host       = 'mail.antagonist.nl'; 
  $mail->SMTPAuth   = true;
  $mail->Username   = 'contact@dmnic.nl';
     $mail->Password   = '769W2ahqFMzmzzAj8rFq';

  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  // Correct From / To / Reply-To
  $mail->setFrom('contact@dmnic.nl', 'DMNIC Website');
  $mail->addAddress('contact@dmnic.nl', 'DMNIC');
  $mail->addReplyTo($email, "$firstName $lastName");

  $mail->isHTML(false);
  $mail->Subject = "Message from form: $firstName $lastName" . ($company ? " ($company)" : "");
  $mail->Body =
    "Company: $company\n" .
    "Name: $firstName $lastName\n" .
    "Email: $email\n\n" .
    "Message:\n$message\n";

  $mail->send();
  header("location: index.html#contact");
  echo "message sent";
}
else{
       header("location: index.html#contact");

}



