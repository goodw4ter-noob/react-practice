
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../Button';
import FormTextArea from '../FormTextArea';
import Input from '../Input';
import UserCounter from '../UserCounter'
import './style.css'

const validateInput = function (text, callback) {
    if (text.length < 3) {
        callback('Слишком короткий текст!');
        return true;
    };

    if (!text) {
        callback('Обязательное поле!');
        return true;
    };

    //проверка на пробелы
    if (/\s/g.test(text)) {
        callback('Не должно быть пробелов!');
        return true;
    }

    return false;
};

const validateUrl = function (url, callback) {
    if (!url) {
        callback('Обязательное поле!');
        return true;
    };

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        callback('Неверный формат ссылки!');
        return true;
    };

    return false;
};

const UserBio = ({ formLoading, onEdit, avatarUrl, userName, subscribed, subscribers, firstName, lastName, description, link, isMyPage, isSubscribed }) => {
    const [btnProps, setBtnProps] = useState({ onClick: () => false, children: 'Подписаться' });
    const [isEditMode, setIsEditMode] = useState(false);

    const [formUserName, setFormUserName] = useState(userName);
    const [formFirstName, setFormFirstName] = useState(firstName);
    const [formLastName, setFormLastName] = useState(lastName);
    const [formDescr, setFormDescr] = useState(description);
    const [formUrl, setFormUrl] = useState(link);

    const [userNameError, setUserNameError] = useState();
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [descrError, setDescrError] = useState();
    const [urlError, setUrlError] = useState();

    // const clearForm = function () {
    //     setFormUserName('');
    //     setFormFirstName('');
    //     setFormLastName('');
    //     setFormDescr('');
    //     setFormUrl('');

    //     setUserNameError('');
    //     setFirstNameError('');
    //     setLastNameError('');
    //     setDescrError('');
    //     setUrlError('');
    // };

    const onSaveEditForm = useCallback(async () => {
        const isUserNameError = validateInput(formUserName, setUserNameError);
        const isFirstNameError = validateInput(formFirstName, setFirstNameError);
        const isLastNameError = validateInput(formLastName, setLastNameError);
        const isUrlError = validateUrl(formUrl, setUrlError)

        let isErrors = isUserNameError || isFirstNameError || isLastNameError || isUrlError;

        if (!formDescr) {
            isErrors = true;
            setDescrError('Обязательное поле!');
        };

        if (isErrors) {
            setIsEditMode(true);
            return;
        };

        await onEdit({
            firstName: formFirstName,
            lastName: formLastName,
            nickname: formUserName,
            url: formUrl,
            description: formDescr,
        });

        setIsEditMode(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formUserName, formFirstName, formLastName, formDescr, formUrl]);

    useEffect(() => {
        if (isMyPage) {
            if (isEditMode) setBtnProps({ onClick: () => onSaveEditForm(), children: 'Сохранить', className: 'cnUserBioEditButton', disabled: formLoading });
            else { setBtnProps({ onClick: () => setIsEditMode(true), children: 'Редактировать' }); }
        } else if (isSubscribed) {
            setBtnProps({ onClick: () => false, children: 'Отписаться' })
        } else {
            setBtnProps({ onClick: () => false, children: 'Подписаться' })
        }
    }, [isMyPage, isSubscribed, isEditMode, onSaveEditForm, formLoading]);

    const fields = useMemo(() => {
        if (isEditMode) {
            return {
                userName: <Input value={formUserName} onChange={({ target: { value } }) => setFormUserName(value)} className='cnInput' errorText={userNameError}></Input>,
                name: (
                    <>
                        <Input value={formFirstName} onChange={({ target: { value } }) => setFormFirstName(value)} className='cnInput' errorText={firstNameError}></Input>
                        <Input value={formLastName} onChange={({ target: { value } }) => setFormLastName(value)} className='cnInput' errorText={lastNameError}></Input>
                    </>
                ),
                description: <FormTextArea className='cnInput' value={formDescr} onChange={({ target: { value } }) => setFormDescr(value)} errorText={descrError} />,
                url: <Input value={formUrl} onChange={({ target: { value } }) => setFormUrl(value)} errorText={urlError}></Input>,
                firstButtonClassName: 'cnUserBioButtonRow',
            }
        };

        return {
            userName: <span className='cnUserBioNickName'>{userName}</span>,
            name: <span className='cnUserBioName'>{firstName} {lastName}</span>,
            description: <span>{description}</span>,
            url: <a href={link} >{link}</a>,
            firstButtonClassName: 'cnUserBioRow',
        };
    }, [descrError, urlError, firstNameError, lastNameError, userNameError, isEditMode, userName, firstName, lastName, description, link, formUserName, formFirstName, formLastName, formDescr, formUrl]);

    return (
        <div className='cnUserBioRoot'>
            <div>
                <img src={avatarUrl} alt='avatar' className='cnUserBioAvatar' />
            </div>
            <div className='cnUserBioInfo'>
                <div className={fields.firstButtonClassName}>
                    {/* <span className='cnUserBioNickName'>{userName}</span> */}
                    {fields.userName}
                    <Button {...btnProps} />
                </div>
                <div className='cnUserBioRow'>
                    <UserCounter text='Публикаций' count={5} className='cnUserBioCounter' />
                    <UserCounter text='Подписчиков' count={subscribed} className='cnUserBioCounter' />
                    <UserCounter text='Подписок' count={subscribers} className='cnUserBioCounter' />
                </div>
                <div className='cnUserBioRow'>
                    {/* <span className='cnUserBioName'>{firstName} {lastName}</span> */}
                    {fields.name}
                </div>
                <div className='cnUserBioRow'>
                    {/* <span>{description}</span> */}
                    {fields.description}
                </div>
                {/* <a href={link}>{link}</a> */}
                {fields.url}
            </div>
        </div>
    )
}

export default UserBio