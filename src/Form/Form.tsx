import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from './tool.model';

const schema = z.object({
  name: z.string().min(3),
  author: z.string().min(3),
  description: z.string().min(3),
  category: z.nativeEnum(Category),
  tags: z.string().array(),
  imageURL: z.string().optional(),
});
export type FormData = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return <div>Form</div>;
}
