<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. استلام البيانات
    $fullname = $_POST['full_name'];
    $email    = $_POST['email'];
    $age      = $_POST['age'];
    $mobile   = $_POST['mobile'];
    $location = $_POST['location'];
    $reason   = $_POST['reason'];

    // 2. تنسيق البيانات عشان تتحفظ في الملف بشكل منظم
    // بنضيف تاريخ ووقت التسجيل عشان تعرف امتى تم
    $date = date("Y-m-d H:i:s");
    
    $data_to_save = "---------------------------------\n";
    $data_to_save .= "Registration Date: $date\n";
    $data_to_save .= "Name: $fullname\n";
    $data_to_save .= "Email: $email\n";
    $data_to_save .= "Age: $age\n";
    $data_to_save .= "Mobile: $mobile\n";
    $data_to_save .= "Location: $location\n";
    $data_to_save .= "Motivation: $reason\n";
    $data_to_save .= "---------------------------------\n\n";

    // 3. حفظ البيانات في ملف missions.txt
    // FILE_APPEND معناها ضيف البيانات الجديدة تحت القديمة مش تمسحها
    $file = 'missions.txt';
    
    if(file_put_contents($file, $data_to_save, FILE_APPEND)) {
        // لو الحفظ نجح
        echo "<h1>Application Saved Successfully!</h1>";
        echo "<p>Thank you, $fullname. Your data has been recorded.</p>";
        echo "<a href='index.html'>Back to Home</a>"; // زرار للرجوع
    } else {
        // لو حصلت مشكلة في الكتابة في الملف
        echo "<h1>Error saving data!</h1>";
    }

} else {
    echo "Direct access not allowed.";
}
?>