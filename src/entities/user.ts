
export class User {

    id!: string;
    password!: string;
    last_login!: Date;
    is_superuser!: boolean;
    username!: string;
    first_name!: string;    
    last_name!: string;
    email!: string;
    is_staff!: boolean;
    is_active!: boolean;
    date_joined!: Date;
    bank_id!: number;
    status!: string;
    phone!: string;
    send_me_emails!: boolean;
    // bf_data_process_bank: Bank;
    // accounts_user_groups!: Group[];
    // accounts_user_user_permissions!: UserPermission[];
    // django_admin_log!: AdminLog[];
    // mailing_mail!: Mail[];

    constructor() {
        this.id = '';
        this.password = '';
        this.last_login = new Date();
        this.is_superuser = false;
        this.username = '';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.is_staff = false;
        this.is_active = false;
        this.date_joined = new Date();
        this.bank_id = 0;
        this.status = '';
        this.phone = '';
        this.send_me_emails = false;
    }
}