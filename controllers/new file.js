$password = password_hash($PASSWORD_DEFAULT);

//generate code
$set='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-/?.>,<\|1234567890'
$code=substr(str_shuffle($set), 0, 12);