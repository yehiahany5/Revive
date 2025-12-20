<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. COLLECT DATA FROM THE FORM
    $operator_name = strip_tags(trim($_POST["full_name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $age = strip_tags(trim($_POST["age"]));
    $mobile = strip_tags(trim($_POST["mobile"]));
    $location = strip_tags(trim($_POST["location"]));
    $motivation = strip_tags(trim($_POST["reason"]));

    // 2. SET YOUR EMAIL ADDRESS
    $to = "your-email@example.com"; // <-- CHANGE THIS TO YOUR REAL EMAIL

    // 3. CREATE THE TACTICAL SUBJECT LINE
    $subject = "NEW OPERATOR ENLISTMENT: $operator_name";

    // 4. FORMAT THE EMAIL BODY (Tactical Report Style)
    $message = "
    [MISSION CONTROL: NEW APPLICANT DETECTED]
    -------------------------------------------
    OPERATOR NAME: $operator_name
    CONTACT FREQ: $email
    AGE: $age
    MOBILE FREQ: $mobile
    COORDINATES: $location
    
    MOTIVATION/OBJECTIVES:
    $motivation
    -------------------------------------------
    [SYSTEM: LOGGED AND ENCRYPTED]
    ";

    // 5. SET EMAIL HEADERS
    $headers = "From: mission-control@revive.com" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // 6. SEND THE EMAIL
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to a 'Success' page or back to home
        header("Location: index.html?status=success");
        exit();
    } else {
        echo "CRITICAL ERROR: UPLINK FAILED. Please try again.";
    }
} else {
    // If someone tries to access this file directly, kick them back to home
    header("Location: index.html");
    exit();
}
?>