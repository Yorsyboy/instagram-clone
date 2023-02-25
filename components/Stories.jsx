import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useRecoilState } from 'recoil';
import { userState } from 'atom/userAtom';

export default function Stories  () {
    const [currentUser] = useRecoilState(userState);
    const [storyUser, setStoryUser] = useState([]);

    useEffect(() => {
        const storyUsers = minifaker.array(20, (i) => ({
            username: minifaker.username({ locale: 'en' }).toLocaleLowerCase(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
            id: i,
        }));
        setStoryUser(storyUsers);
    }, []);

  return (
    <div className='flex space-x-2 p-4 bg-white mt-8 border-gray-200 border-1 overflow-x-scroll rounded-sm scrollbar-none'>
        {currentUser && (
            <Story username={currentUser?.username} img={currentUser?.userImg} isUser="true" />
        )}
        {storyUser.map((user) => (
            <Story key={user.id} username={user.username} img={user.img} />
        ))}
    </div>
  )
}
