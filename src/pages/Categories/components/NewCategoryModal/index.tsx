import * as z from 'zod'
import * as S from './styles'
import { ModalScreen } from '../../../../components/ModalScreen'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultButton } from '../../../../components/DefaultButton'
import { useContextSelector } from 'use-context-selector'
import { CategoriesContext } from '../../../../contexts/categories/CategoriesContext'
import { simulateEscapeKey } from '../../../../utils/simulateEscapeKey'
import { useEffect } from 'react'

interface NewCategoryModalProps {
  typeOfCategory: boolean
}

export function NewCategoryModal({ typeOfCategory }: NewCategoryModalProps) {
  const createNewCategory = useContextSelector(CategoriesContext, (context) => {
    return context.createNewCategory
  })

  const newCategoryModalSchema = z.object({
    name: z.string(),
    type: z.enum(['expense', 'income']),
  })

  type NewCategoryModalInputs = z.infer<typeof newCategoryModalSchema>

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewCategoryModalInputs>({
    resolver: zodResolver(newCategoryModalSchema),
    defaultValues: {
      type: typeOfCategory ? 'income' : 'expense',
    },
  })

  async function handleCreateNewCategory(data: NewCategoryModalInputs) {
    createNewCategory(data)
    reset()
    simulateEscapeKey()
  }

  useEffect(() => {
    reset({ name: '', type: typeOfCategory ? 'income' : 'expense' })
  }, [typeOfCategory, reset])

  return (
    <ModalScreen title="Nova categoria">
      <S.NewCategoryForm onSubmit={handleSubmit(handleCreateNewCategory)}>
        <input type="text" placeholder="Nome" {...register('name')} />

        <DefaultButton
          type="submit"
          title="Cadastrar"
          disabled={isSubmitting}
        />
      </S.NewCategoryForm>
    </ModalScreen>
  )
}
