export default {
    localStorageUserLoginKey: 'uml-login',
    localStorageLanguageKey: 'uml-Language',
    roleId: '599ae2df2768fe9371babc92',
    apiUrl: {
        getAssetPath: '/assethome',
        login: '/login',
        gmailLogin: '/gmailSignIn',
        consumerLogin: '/user/{userId}/customerLogin',
        refreshToken: '/refreshtoken',
        clientSideException: 'sendClientSideException',
        sendForgot: '/sendforgot?email={email}&billingParentId={parentId}',
        forgotPasswordVerify:
            '/forgotpasswordverify?token={token}&billingParentId={parentId}&newPassword={password}',
        userByDomain: '/user?domain=',
        signup: '/user',
        getCampaignList: '/campaign?page={page}&limit={limit}',
        getCampaignHistory:
            '/campaign/{campaignId}/campaign-history?page={page}&limit={limit}',
        createCompaign: '/campaign',
        updateCampaignV2: '/campaign/{campaignId}',
        deleteCampaign: '/campaign/{campaignId}',
        testYourCall: '/campaign/test',
        performCampaignAction: '/campaign/{campaignId}?action={action}',
        getTotalNumbersUploadedContacts: '/userDetail',
        deleteDncNumber: '/dnc',
        getSoundList: '/soundfile',
        getDefaultSound: '/soundfile/default',
        contactList: '/contactlist/{contactListId}',
        soundFile: '/soundfile/{soundFileId}',
        updateUserAccount: '/updateuser',
        updatePassword: '/updatePassword',
        resendVerify: '/resendverify?userId={userId}',
        verify:
            '/verify?token={token}&billingParentId={parentId}&password={password}',
        confirm: '/confirm?token={token}&billingParentId={parentId}',
        sendSupportMessage: '/sendsupportmessage',
        getContactList:
            '/contactlist?page={number}&limit={limit}&isDoNotContactList={isDoNotContactList}',
        getCurrentFunds: '/currentfunds',
        getBillingDetails: '/billingdetails',
        getParentBillingInfo: '/billingParent',
        deleteAccountLogo: '/logo',
        checkoutWepayAccount: '/wepay/checkout',
        updateCampaign: '/campaign/{campaignId}/{method}',
        getCampaignDetail: '/campaign/{campaignId}/detail',
        stripeKey: '/stripe/key',
        stripeCharge: '/stripe/charge',
        fcm: '/fcm',
        getUserById: '/userinfo',
        getRequestApiKeyByUserId: '/apitoken',
        textToSpeach: '/soundfile/tts',
        exportCampaign: '/campaign/{campaignId}/export?action={action}',
        rerunCampaign: '/campaign/{campaignId}/rerun',
        addDNCNumber: '/adddnc',
        addDNCFile: '/adddncbulk',
        removeDNCNumber: '/dnc?number={number}',
        findDNCNumber: '/dnc?number={number}',
        getMessageInfo: '/messagesettings',
        savePhoneNumber: '/messagesettings/number',
        saveMessageSettings: '/messagesettings',
        saveBulkContact: '/contact/bulk',
        saveContact: '/contact',
        updateContact: '/contact/{conatctID}',
        deleteContact: '/contact/{userID}',
        getContactListMC:
            '/contact?page={number}&limit={limit}&status={status}',
        getContactListSe:
            '/contact?page={number}&limit={limit}&search={search}',
        getOneConatct: '/contact/{conatctID}',
        sendNewMessage: '/contact/{contactID}/message',
        sendNewMessageDirect: '/directmessage',

        getMessageinfo: '/messagesettings',
        getMessageList: '/contact/{contactID}/message',
        makFollowUp: '/contact/{contactID}/followup?status={status}',
        MarkUnmarkFav: '/contact/{contactID}/favourite?status={status}',
        ReadUnreadMsg: '/contact/{contactID}/haveUnreadMessage?status={status}',
        childAccount: '/childaccount',
        lockChild: '/user/{userID}/lock?action=unlock',
        deleteChild: '/user/{userID}/delete',
        addBalance: '/user/{userID}/balance',
        unreadCount: '/unreadmessagecount',
    },
    pageUrl: {
        login: '/login',
        signup: '/signup',
        forgotPassword: '/forgotpassword',
        home: '/home',
    },
    apiRequestHeaders: {
        default: {
            contentType: 'application/json',
            source: 'Web',
            requestCode: '123',
            ifModifiedSince: '0',
            cacheControl: 'no-cache',
            pragma: 'no-cache',
        },
    },

    apiRequestHeaderKeys: {
        contentType: 'Content-Type',
        authorization: 'Authorization',
        xAuthorization: 'X_AUTHORIZATION',
        source: 'X_SOURCE',
        requestCode: 'X_REQUEST_CODE',
        authToken: 'x_auth_token',
        ifModifiedSince: 'If-Modified-Since',
        cacheControl: 'Cache-Control',
        pragma: 'Pragma',
    },

    errorCodes: {
        authenticationFailure: '1001',
        accessDenied: '1002',
        requestNotValid: '1003',
        businessRuleFailure: '1004',
        exception: '1005',
        notFound: '1006',
    },

    dateFormats: {
        mmddyyyy: 'MM/dd/yyyy',
        yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
        MMDDYYYYhhmm: 'MM/DD/YYYY hh:mm',
    },

    events: {
        navigation: 'navigate',
        userLoaded: 'userLoaded',
        deleteSoundFile: 'deleteSoundFile',
        deleteContactList: 'deleteContactList',
        loadSoundFiles: 'loadSoundFiles',
        loadContactLists: 'loadContactLists',
        deleteUploadedFile: 'deleteUploadedFile',
        showLoader: 'showLoader',
    },

    toasterConfig: {
        showCloseButton: true,
        tapToDismiss: true,
        timeout: 2000,
        positionClass: 'toast-top-right',
        animation: 'fade',
    },

    sessionTimeout: {
        timeoutComponentShowTime: 60, //seconds for how long to show component
        showComponentBeforeTime: 100000, // milliseconds before timeout for when to show the component.
        tickTime: 10, // seconds
    },

    options: {
        title: {
            display: true,
            text: 'Listening Duration',
            position: 'right',
        },
        animation: {
            numSteps: 8,
            easing: 'easeOutBounce',
        },
        toolTip: {
            bodyFontSize: 25,
        },
        legend: {
            display: true,
            fullWidth: true,
            reverse: true,
            position: 'bottom',
        },
    },
    campaignStatus: {
        1: 'New',
        2: 'Running',
        3: 'Stopped',
        4: 'Complete',
    },
    campaignTypes: {
        1: 'Voice Only',
        2: 'Live Answer And Answer Machine No Transfer',
        3: 'Live Answer And Answer Machine With Transfer',
        4: 'Live Answer Only No Transfer',
        5: 'Live Answer Only With Transfer',
        6: 'Text Blast',
    },
    campaignExportOptions: {
        csv: 1,
        excel: 2,
        pdf: 3,
        xml: 4,
    },
    campaigns: {
        voiceOnly: {
            id: 1,
            sound: true,
            soundVoiceMail: false,
            soundDNC: false,
            soundTransfer: false,
            testYourMessage: false,
            testYourCall: true,
            contactListUpload: true,
            keywords: false,
            summary: true,
            message: false,
        },

        laAndAmNoTransfer: {
            id: 2,
            sound: true,
            soundVoiceMail: true,
            soundDNC: true,
            soundTransfer: false,
            testYourMessage: false,
            testYourCall: true,
            contactListUpload: true,
            keywords: false,
            summary: true,
            message: false,
        },

        laAndAmWithTransfer: {
            id: 3,
            sound: true,
            soundVoiceMail: true,
            soundDNC: true,
            soundTransfer: true,
            testYourMessage: false,
            testYourCall: true,
            contactListUpload: true,
            keywords: false,
            summary: true,
            message: false,
        },

        liveAnswerOnlyNoTransfer: {
            id: 4,
            sound: true,
            soundVoiceMail: false,
            soundDNC: true,
            soundTransfer: false,
            testYourMessage: false,
            testYourCall: true,
            contactListUpload: true,
            keywords: false,
            summary: true,
            message: false,
        },

        liveAnswerOnlyWithTransfer: {
            id: 5,
            sound: true,
            soundVoiceMail: false,
            soundDNC: true,
            soundTransfer: true,
            testYourMessage: false,
            testYourCall: true,
            contactListUpload: true,
            keywords: false,
            summary: true,
            message: false,
        },

        textBlast: {
            id: 6,
            sound: false,
            soundVoiceMail: false,
            soundDNC: false,
            soundTransfer: false,
            testYourMessage: true,
            testYourCall: false,
            contactListUpload: true,
            keywords: true,
            summary: true,
            message: true,
        },
    },
    soundFileType: {
        sound: 'sound',
        dnc: 'dnc',
        vm: 'vm',
        transfer: 'transfer',
    },
    dataKeys: {
        domainUser: 'domainUser',
        assetsPath: 'assetsPath',
        userInfo: 'userInfo',
    },
    contractTypes: [
        {
            id: 1,
            name: 'Pay As You Go',
        },
        {
            id: 2,
            name: 'Monthly',
        },
        {
            id: 3,
            name: 'Quarterly',
        },
        {
            id: 4,
            name: 'Semi Annually',
        },
        {
            id: 5,
            name: 'Annually',
        },
    ],
    billingTypes: [
        {
            id: 1,
            name: 'Per Contact',
        },
        {
            id: 2,
            name: '6 Secs',
        },
        {
            id: 3,
            name: '30 Secs',
        },
        {
            id: 4,
            name: 'Per Minute',
        },
    ],
    paymentMethods: {
        Wepay: 1,
        Stripe: 2,
    },
};
