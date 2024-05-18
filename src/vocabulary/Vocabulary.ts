export interface Vocabulary {
    [key :string] :string;
}

export const V : Vocabulary={
    accessCode: 'Код доступа:',
    inputAccessCode : 'Введите код доступа',
    requestCode : 'Запросить код доступа',
    aboutCode : 'Для входа в систему используется временный код доступа. Вы можете запросить код, отправив ваш адресс электронной почты администратору.' +
        ' Полученный код можно передавать другим пользователям',
    email : 'Адрес электронной почты',
    wrong_email_format : 'Неверный формат электронной почты',
    messageToAdmin : 'Сообщение',
    youNotRegistered : '',
    doAuthorize : '',

    searchNumber : 'Поиск числа',
    inputNumber : 'Введите число',
    search : 'Поиск',
    login : 'Войти',
    logout : 'Выйти',
    enter_code : 'Ввести код',
    numberOutOfRange : 'Число за пределами текущих знаний системы',
    register : 'Зарегистрироваться',
    registration: 'Регистрация',
    registered_user_caption : 'Ваше имя пользователя: ',
    cancel : 'Отмена',
    password: 'Пароль',
    input_password: 'Введите пароль',
    repeat_password: 'Повторите пароль',
    register_terms : 'Пройдя процедуру регистрации, вы получите временный код доступа к книге. Код можно передавать другим пользователям.',
    password_not_matches : 'Пароль не соответствует подтверждению',
    check_email :'Проверьте ваш почтовый ящик',
    get_access_code : 'Код доступа выслан вам на почту',

    exception : 'Ошибка',
    server_unreachable : 'Не удалось связаться с сервером',
    no_network : 'Отсутствует соединение с сетью или сервер недоступен',
    operation_completed : 'Операция завершена',
    operation_success : 'Операция завершена успешно',
    authorization_failure : 'Не удалось авторизоваться на сервере',
    bad_credentials : 'Не верный логин или пароль',
    operation_denied : 'Операция не разрешена',
    permission_required : 'Недотаточно прав для выполнения операции',
    interface_label_301 : 'Пользователь заблокирован',
    contact_administration : 'Для выяснения причин свяжитесь с администрацией',
    operation_error : 'Ошибка операции',
    unprocessable_request : 'Запрос не может быть обработан на сервере',
    object_missing : 'Искомый объект не найден или не принадлежит вам',
    wrong_password : 'Неверный пароль',
    wrong_password_confirmation : 'Пароль и подтверждение не совпадают',
    bad_request : 'Неправильный запрос',
    bad_request_data : 'В запросе указаны некорректные данные',
    conflict : 'Конфликт',
    user_exists : 'Пользователь с таким адресом электронной почты уже зарегистрирован',
    duplicated_id : 'Ресурс с таким идентификатором уже существует',
    data_in_use : 'Данные не могут быть удалены, пока на на них ссылаются другие данные',
    not_found : 'Ресурс не найден',
    no_data_found : 'По вашему запросу ничего не найдено',
    processing : 'Запрос обрабатывается',
    waiting_server_response : 'Запрос отправлен, программа ожидает ответ сервера...',
    operation_time_out : 'Превышено время ожидания',
    server_time_out : 'Ответ от сервера не был получен в течении допустимого времени.',

    email_was_sent : 'Проверьте указанные почтовый адрес',
    email_is_processed: 'Сообщение обрабатывается',
    email_delivered : 'Сообщение доставлено на указанный адрес',
    email_error : 'Ошибка доставки сообщения, проверьте правильность адреса',
    wrong_username_password : 'Неверный логин или пароль',
    more_label : 'Ещё',
    no_input_label : 'Поле не должно быть пустым',
    text_search_label : 'Поиск',
    text_search_placeholder : 'Введите число или текст',
    goto_start_label : 'В начало книги',
    number_not_found : 'Этого числа еще нет в книге',
    message_support_label : 'Связь с автором',
    quotations_label : 'Цитаты',
    expand_label : 'Развернуть',
    send_label : 'Отправить',
    theme_label : 'Тема письма',
    message_label : 'Текст письма',
    empty_message_label : 'Нечего отправлять',
    message_was_sent : 'Письмо отправлено',
    contact_label : 'Связаться с автором'
};

export const message_was_sent = 'message_was_sent';
export const theme_label = 'theme_label';
export const message_label = 'message_label';
export const empty_message_label = 'empty_message_label';
export const searchNumber = 'searchNumber';
export const inputNumber = 'inputNumber';
export const search = 'search';
export const login_caption = 'login';
export const register_caption = 'register';
export const registration = 'registration';
export const cancel = 'cancel';
export const enter_code = 'enter_code';
export const numberOutOfRange = 'numberOutOfRange';
export const requestCode = 'requestCode';
export const aboutCode = 'aboutCode';
export const email = 'email';
export const wrong_email_format = 'wrong_email_format';
export const messageToAdmin = 'messageToAdmin';
export const accessCode=  'accessCode';
export const inputAccessCode = 'inputAccessCode';
export const password = 'password';
export const password_not_matches = 'password_not_matches';
export const input_password = 'input_password';
export const repeat_password = 'repeat_password';
export const register_terms = 'register_terms';
export const exception = 'exception';
export const server_unreachable = 'server_unreachable';
export const no_network = 'no_network';
export const operation_completed = 'operation_completed';
export const operation_success = 'operation_success';
export const authorization_failure = 'authorization_failure';
export const bad_credentials = 'bad_credentials';
export const operation_denied = 'operation_denied';
export const permission_required = 'permission_required';
export const interface_label_301 = 'interface_label_301';
export const contact_administration = 'contact_administration';
export const operation_error = 'operation_error';
export const unprocessable_request = 'unprocessable_request';
export const object_missing = 'object_missing';
export const wrong_password = 'wrong_password';
export const wrong_password_confirmation = 'wrong_password_confirmation';
export const bad_request = 'bad_request';
export const bad_request_data = 'bad_request_data';
export const conflict = 'conflict';
export const duplicated_id = 'duplicated_id';
export const data_in_use = 'data_in_use';
export const not_found = 'not_found';
export const no_data_found = 'no_data_found';
export const processing = 'processing';
export const waiting_server_response = 'waiting_server_response';
export const operation_time_out ='operation_time_out';
export const server_time_out ='server_time_out';
export const user_exists ='user_exists';
export const registered_user_caption = 'registered_user_caption';
export const check_email = 'check_email';
export const get_access_code ='get_access_code';
export const logout_label = 'logout';

export const email_was_sent = 'email_was_sent';
export const email_is_processed = 'email_is_processed';
export const email_delivered = 'email_delivered';
export const email_error = 'email_error';
export const wrong_username_password ='wrong_username_password';
export const more_label = 'more_label';
export const no_input_label = 'no_input_label';
export const text_search_label = 'text_search_label';
export const text_search_placeholder = 'text_search_placeholder';
export const goto_start_label = 'goto_start_label';
export const number_not_found = 'number_not_found';
export const message_support_label = 'message_support_label';
export const quotations_label = 'quotations_label';
export const expand_label = 'expand_label';
export const send_label ='send_label';
export const contact_label = 'contact_label';
