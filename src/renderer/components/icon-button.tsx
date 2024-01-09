import classNames from 'classnames'

export function IconButton(props: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={
        classNames(
          'hover:rounded-full p-2 inline-flex justify-center items-center'
        , 'hover:bg-gray-200 disabled:bg-gray-300'
        , 'text-gray-700 hover:text-gray-900'
        , props.className
        )
      }
    />
  )
}
