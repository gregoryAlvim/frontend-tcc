import * as z from 'zod'
import * as S from './styles'
import Select from 'react-select'
import { Category } from '../../../../@types/mockes'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { CategoriesContext } from '../../../../contexts/categories/CategoriesContext'

interface NewPlanningStepTwoProps {
  handleSetDataStepTwo: (data: Category[]) => void
}

export function NewPlanningStepTwo({
  handleSetDataStepTwo,
}: NewPlanningStepTwoProps) {
  const categorySchema = z.object({
    id: z.string(),
    value: z.string(),
    label: z.string(),
  })

  const newPlanningStepTwoSchema = z.object({
    categories: z.array(categorySchema),
  })

  type NewPlanningStepTwoInputs = z.infer<typeof newPlanningStepTwoSchema>

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPlanningStepTwoInputs>({
    resolver: zodResolver(newPlanningStepTwoSchema),
  })

  const categoriesToExpense = useContextSelector(
    CategoriesContext,
    (context) => {
      return context.categoriesToExpense
    },
  )

  const optionsExpenseToSelect = categoriesToExpense.map((category) => {
    return {
      id: category.id,
      value: category.name,
      label: category.name,
    }
  })

  function handleSelectedCategories(data: NewPlanningStepTwoInputs) {
    const { categories } = data

    const selectedCategories = categoriesToExpense.filter((category) =>
      categories.some(
        (selectedCategory) => selectedCategory.id === category.id,
      ),
    )

    handleSetDataStepTwo(selectedCategories)
  }

  return (
    <S.FormStepTwo onSubmit={handleSubmit(handleSelectedCategories)}>
      <strong>Segundo passo</strong>
      <span>
        Escolha quais categorias você gostaria de incluir em seu planejamento
        mensal.
      </span>

      <S.SelectContainer>
        <label htmlFor="categoriesSelect">Categorias</label>

        <Controller
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              {...field}
              id="categoriesSelect"
              isMulti
              isSearchable={false}
              options={optionsExpenseToSelect}
              onChange={(selectedOptions) => {
                setValue(
                  'categories',
                  selectedOptions.map((option) => option),
                )
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: '#121214',
                  border: 'none',
                }),
                multiValue: (base) => ({
                  ...base,
                  color: '#8047F8',
                  '&:hover': { cursor: 'pointer' },
                }),
                menuList: (base) => ({
                  ...base,
                  background: '#29292E',
                }),
                option: (base) => ({
                  ...base,
                  color: '#121214',
                  '&:hover': {
                    cursor: 'pointer',
                    color: '#121214',
                    background: '#C4C4CC',
                  },
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  '&:hover': { cursor: 'pointer' },
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#121214',
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  background: 'none',
                }),
                clearIndicator: (base) => ({
                  ...base,
                  background: 'none',
                  '&:hover': { cursor: 'pointer', color: '#F75A68' },
                }),
              }}
            />
          )}
          name="categories"
        />
      </S.SelectContainer>

      <button type="submit" disabled={isSubmitting}>
        Continuar
      </button>
    </S.FormStepTwo>
  )
}
