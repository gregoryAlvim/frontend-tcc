import * as z from 'zod'
import * as S from './styles'
import Select from 'react-select'
import { parse, format } from 'date-fns'
import { CheckCircle, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { Category, Expense, Income } from '../../@types/mockes'
import { IncomeContext } from '../../contexts/income/IncomeContext'
import { ExpenseContext } from '../../contexts/expense/ExpenseContext'
import { CategoriesContext } from '../../contexts/categories/CategoriesContext'
import { simulateEscapeKey } from '../../utils/simulateEscapeKey'

const updateTransactionFormSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  date: z.string(),
  value: z.number(),
  categoryUUID: z.string(),
  type: z.enum(['income', 'expense']),
  isPayOrIsReceived: z.boolean(),
})

type UpdateTransactionFormInputs = z.infer<typeof updateTransactionFormSchema>

interface UpdateTransactionModalProps {
  typeOfButton: 'income' | 'expense'
  data: Income | Expense
}

export function UpdateTransactionModal({
  data,
  typeOfButton = 'income',
}: UpdateTransactionModalProps) {
  const { categoriesToExpense, categoriesToIncome } = useContextSelector(
    CategoriesContext,
    (context) => {
      return context
    },
  )

  const updateIncome = useContextSelector(IncomeContext, (context) => {
    return context.updateIncome
  })

  const updateExpense = useContextSelector(ExpenseContext, (context) => {
    return context.updateExpense
  })

  function createOptionsToSelect(items: Category[]) {
    const resultOptions = items.map((item) => {
      return {
        id: item.id,
        value: item.name,
        label: item.name,
      }
    })

    return resultOptions
  }

  const optionsExpenseToSelect = createOptionsToSelect(categoriesToExpense)
  const optionsIncomeToSelect = createOptionsToSelect(categoriesToIncome)

  const checkIsTypeIncome = typeOfButton === 'income'

  const checkTypeOfOptionsToSelect = checkIsTypeIncome
    ? optionsIncomeToSelect
    : optionsExpenseToSelect

  function hasIsReceivedOrIsPay(item: any) {
    return item.category.type === 'income' ? item?.isReceived : item?.isPay
  }

  const inputDate = parse(data.date, 'dd/MM/yyyy', new Date())
  const formattedDate = format(inputDate, 'yyyy-MM-dd')

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateTransactionFormInputs>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: data?.id,
      date: formattedDate,
      value: data?.value,
      type: typeOfButton,
      description: data?.description,
      categoryUUID: data?.category.name,
      isPayOrIsReceived: hasIsReceivedOrIsPay(data),
    },
  })

  async function handleUpdateTransaction(data: UpdateTransactionFormInputs) {
    const {
      id,
      date,
      type,
      value,
      description,
      categoryUUID,
      isPayOrIsReceived,
    } = data

    const inputDate = parse(date, 'yyyy-MM-dd', new Date())
    const formattedDate = format(inputDate, 'dd/MM/yyyy')

    if (type === 'income') {
      const category = categoriesToIncome.find(
        (item) => item.id === categoryUUID || item.name === categoryUUID,
      )

      if (category !== undefined) {
        const newIncome: Income = {
          id,
          value,
          category,
          description,
          date: formattedDate,
          isReceived: isPayOrIsReceived,
        }

        updateIncome(newIncome)
        simulateEscapeKey()
      }
    } else if (type === 'expense') {
      const category = categoriesToExpense.find(
        (item) => item.id === categoryUUID || item.name === categoryUUID,
      )

      if (category !== undefined) {
        const newExpense: Expense = {
          id,
          value,
          category,
          description,
          date: formattedDate,
          isPay: isPayOrIsReceived,
        }

        updateExpense(newExpense)
        simulateEscapeKey()
      }
    }
  }

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Editando transação</Dialog.Title>

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form
          id="defaultUpdateForm"
          onSubmit={handleSubmit(handleUpdateTransaction)}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Valor"
            required
            {...register('value', { valueAsNumber: true })}
          />

          <input
            required
            type="date"
            className="inputDate"
            {...register('date')}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Select
                name={name}
                isSearchable={false}
                value={checkTypeOfOptionsToSelect.find(
                  (option) => option.value === value,
                )}
                onChange={(selectedOption: any) => {
                  onChange(selectedOption.id)
                }}
                options={checkTypeOfOptionsToSelect}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    background: '#121214',
                    border: 'none',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#C4C4CC',
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#C4C4CC',
                  }),
                  menuList: (base) => ({
                    ...base,
                    background: '#29292E',
                    color: '#C4C4CC',
                  }),
                  option: (base) => ({
                    ...base,
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
                }}
              />
            )}
            name="categoryUUID"
          />

          <Controller
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <S.SwitchContainer>
                <label className="Label" htmlFor="switch-question">
                  {field.value === true
                    ? `Foi ${checkIsTypeIncome ? 'recebida' : 'paga'}`
                    : `Não foi ${checkIsTypeIncome ? 'recebida' : 'paga'}`}
                </label>

                <Switch.Root
                  className="SwitchRoot"
                  id="switch-question"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                >
                  <Switch.Thumb className="SwitchThumb" asChild>
                    <CheckCircle size={18} />
                  </Switch.Thumb>
                </Switch.Root>
              </S.SwitchContainer>
            )}
            name="isPayOrIsReceived"
          />

          <button type="submit" disabled={isSubmitting}>
            Atualizar
          </button>
        </form>
      </S.Content>
    </Dialog.Portal>
  )
}
