import { Character } from '@/models/character';
import Image from 'next/image';
import { StatusIndicator } from './status-indicator';

export default function CharacterAvatar({ image, name, status } : {
    image: Character['image'];
    name: Character['name'];
    status: Character['status'];
}) {
  return (
    <div className='w-16 h-16 rounded-full bg-indigo-100 overflow-hidden border-2 border-indigo-200 relative'>
      <Image
        src={image || '/placeholder.webp'}
        alt={name}
        width={300}
        height={300}
        className='w-full h-full object-cover'
      />

      <div className='absolute bottom-1 right-0'>
        <StatusIndicator status={status} />
      </div>
    </div>
  );
}
