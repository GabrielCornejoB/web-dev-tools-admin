import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Tool } from './tool.model';
import { createTool } from './useFirestore';

const schema = z.object({
  name: z.string().min(3),
  author: z.string().min(3),
  description: z.string().min(3).max(100),
  category: z.nativeEnum(Category),
  tags: z.object({ tag: z.string().min(1) }).array(),
  imageURL: z.string().optional(),
});
export type FormData = z.infer<typeof schema>;

export default function Form() {
  const { register, handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      author: '',
      description: '',
      category: Category.ICONS,
      tags: [{ tag: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({ name: 'tags', control });

  const description = useWatch({ control: control, name: 'description' });
  const image = useWatch({ control: control, name: 'imageURL' });

  const handleFormSubmit = (data: FormData) => {
    const newTool: Tool = {
      name: data.name,
      author: data.author,
      description: data.description,
      category: data.category,
      imageURL: data.imageURL,
      tags: data.tags.map((tag) => tag.tag),
    };
    createTool(newTool);
    reset();
  };

  return (
    <div className='flex flex-col items-center gap-12'>
      <h1 className='font-mono text-4xl'>web-dev-tools form</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='flex w-96 flex-col gap-4'
      >
        <input
          {...register('name')}
          type='text'
          placeholder='Tool name'
          className='input input-bordered w-full'
        />
        <input
          {...register('author')}
          type='text'
          placeholder='Author'
          className='input input-bordered w-full'
        />
        <div className='flex flex-row'>
          <textarea
            {...register('description')}
            placeholder='Description'
            rows={3}
            className={`textarea w-4/5 resize-none ${
              description.length < 35
                ? 'textarea-bordered'
                : description.length < 75
                ? 'textarea-primary'
                : description.length < 100
                ? 'textarea-warning'
                : 'textarea-error'
            }`}
          />
          <div className='grid flex-grow place-items-center font-mono text-2xl'>
            <span>{description.length}</span>
          </div>
        </div>
        <select className='select select-bordered w-full'>
          {Object.values(Category).map((c) => (
            <option value={c} id={c} key={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <div className='flex flex-row'>
          <input
            {...register('imageURL')}
            type='text'
            placeholder='Image URL (Optional)'
            className='input input-bordered flex-grow'
          />
          {image ? (
            <img src={image} alt='a' className='aspect-square w-12' />
          ) : (
            <div className='aspect-square w-12'></div>
          )}
        </div>
        {fields.map((field, index) => (
          <div className='flex flex-row gap-4' key={field.id}>
            <input
              {...register(`tags.${index}.tag` as const)}
              type='text'
              placeholder={`Tag ${index + 1}`}
              className='input input-bordered flex-grow'
            />
            <button
              type='button'
              onClick={() => remove(index)}
              className='btn btn-error btn-outline'
            >
              X
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() => append({ tag: '' })}
          className='btn btn-success btn-outline'
        >
          ADD TAG
        </button>
        <button type='submit' className='btn btn-secondary'>
          CREATE NEW TOOL
        </button>
      </form>
    </div>
  );
}
