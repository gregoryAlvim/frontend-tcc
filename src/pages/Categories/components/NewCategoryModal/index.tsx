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
import { Category } from '../../../../@types/mockes'

interface NewCategoryModalProps {
  typeOfCategory: boolean
  selectedCategory?: Category
}

export function NewCategoryModal({
  typeOfCategory,
  selectedCategory,
}: NewCategoryModalProps) {
  const { createNewCategory, updateCategory } = useContextSelector(
    CategoriesContext,
    (context) => {
      return context
    },
  )

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
      name: selectedCategory ? selectedCategory.name : '',
      type: typeOfCategory ? 'income' : 'expense',
    },
  })

  async function handleCreateNewCategory(data: NewCategoryModalInputs) {
    createNewCategory(data)
    reset()
    simulateEscapeKey()
  }

  async function handleUpdateCategoryById(data: NewCategoryModalInputs) {
    const { name } = data

    if (selectedCategory?.id !== undefined) {
      updateCategory(selectedCategory.id, name)
      reset()
      simulateEscapeKey()
    }
  }

  useEffect(() => {
    reset({
      name: selectedCategory ? selectedCategory.name : '',
      type: typeOfCategory ? 'income' : 'expense',
    })
  }, [typeOfCategory, reset, selectedCategory])

  return (
    <ModalScreen
      title={selectedCategory ? 'Atualizar categoria' : 'Nova categoria'}
    >
      <S.NewCategoryForm
        onSubmit={handleSubmit(
          selectedCategory ? handleUpdateCategoryById : handleCreateNewCategory,
        )}
      >
        <input type="text" placeholder="Nome" {...register('name')} />

        <DefaultButton
          type="submit"
          title={selectedCategory ? 'Atualizar' : 'Cadastrar'}
          disabled={isSubmitting}
        />
      </S.NewCategoryForm>
    </ModalScreen>
  )
}
