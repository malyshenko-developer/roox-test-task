import { useSelector } from 'react-redux';
import Button from '../../components/ui/button/button';
import styles from './user-page.module.scss';
import { selectUserProfile } from '../../store/selectors/selectUserProfile';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchUserById, updateUserData } from '../../features/userProfile/userProfileSlice';
import { useParams } from 'react-router-dom';
import TextField from '../../components/ui/text-field/text-field';

const UserPage = () => {
    const dispatch = useAppDispatch();
    const { userData, isLoading } = useSelector(selectUserProfile);

    const { userId } = useParams<{ userId: string }>();
    const [ isEditable, setIsEditable ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        username: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        phone: '',
        website: '',
        comment: ''
    })

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId))
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                username: userData.username,
                email: userData.email,
                street: userData.address.street,
                city: userData.address.city,
                zipcode: userData.address.zipcode,
                phone: userData.phone,
                website: userData.website,
                comment: userData.comment
            })
        }
    }, [userData]);

    const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (userData) {
            const updatedData = {
                ...userData,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                address: {
                    ...userData.address,
                    street: formData.street,
                    city: formData.city,
                    zipcode: formData.zipcode,
                },
                phone: formData.phone,
                website: formData.website,
                comment: formData.comment
            }
    
            dispatch(updateUserData(updatedData))
        }
    }

    if (isLoading) return <p>Загрузка...</p>

    return (
        <div className={styles.userPage}>
            <div className={styles.userPage__top}>
                <h1>
                    Профиль пользователя
                </h1>
                <Button onClick={() => setIsEditable(!isEditable)}>
                    Редактировать
                </Button>
            </div>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.textFields}>
                    <TextField label='Name' value={formData.name} disabled={!isEditable} name='name' onChange={handleChangeTextField} />
                    <TextField label='User name' value={formData.username} disabled={!isEditable} name='username' onChange={handleChangeTextField} />
                    <TextField label='E-mail' value={formData.email} disabled={!isEditable} name='email' onChange={handleChangeTextField} />
                    <TextField label='Street' value={formData.street} disabled={!isEditable} name='street' onChange={handleChangeTextField} />
                    <TextField label='City' value={formData.city} disabled={!isEditable} name='city' onChange={handleChangeTextField} />
                    <TextField label='Zip code' value={formData.zipcode} disabled={!isEditable} name='zipcode' onChange={handleChangeTextField} />
                    <TextField label='Phone' value={formData.phone} disabled={!isEditable} name='phone' onChange={handleChangeTextField} />
                    <TextField label='Website' value={formData.website} disabled={!isEditable} name='website' onChange={handleChangeTextField} />
                    <TextField label='Comment' value={formData.comment} disabled={!isEditable} name='comment' onChange={handleChangeTextField} multiline={true} />
                </div>
                <div className={styles.userPage__bottom}>
                    <Button disabled={!isEditable} accent={isEditable} type={'submit'}>Отправить</Button>
                </div>
            </form>
        </div>
    )
}

export default UserPage;