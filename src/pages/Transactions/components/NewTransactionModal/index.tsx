import * as z from 'zod'
import * as S from './styles'
import { useState } from 'react'
import Select from 'react-select'
import { parse, format } from 'date-fns'
import * as Switch from '@radix-ui/react-switch'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Expense, Income } from '../../../../@types/mockes'
import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../../../../contexts/income/IncomeContext'
import { ArrowCircleDown, ArrowCircleUp, CheckCircle, X } from 'phosphor-react'
import { CategoriesContext } from '../../../../contexts/categories/CategoriesContext'
import { ExpenseContext } from '../../../../contexts/expense/ExpenseContext'
import { ModalScreen } from '../../../../components/ModalScreen'

const newTransactionFormSchema = z.object({
  description: z.string(),
  date: z.string(),
  value: z.number(),
  categoryUUID: z.string(),
  type: z.enum(['income', 'expense']),
  isPayOrIsReceived: z.boolean(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  typeOfButton: 'income' | 'expense'
}

export function NewTransactionModal({
  typeOfButton = 'income',
}: NewTransactionModalProps) {
  const [typeOptions, setTypeOptions] = useState<'income' | 'expense'>(
    typeOfButton,
  )

  function handleSetTypeOptions(type: 'income' | 'expense') {
    setTypeOptions(type)
  }

  const { categoriesToExpense, categoriesToIncome } = useContextSelector(
    CategoriesContext,
    (context) => {
      return context
    },
  )

  const createNewIncome = useContextSelector(IncomeContext, (context) => {
    return context.createNewIncome
  })

  const createNewExpense = useContextSelector(ExpenseContext, (context) => {
    return context.createNewExpense
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
  const checkIsTypeIncome = typeOptions === 'income'
  const checkTypeOfOptionsToSelect = checkIsTypeIncome
    ? optionsIncomeToSelect
    : optionsExpenseToSelect

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: typeOfButton,
      isPayOrIsReceived: false,
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, categoryUUID, date, value, type, isPayOrIsReceived } =
      data

    const inputDate = parse(date, 'yyyy-MM-dd', new Date())
    const formattedDate = format(inputDate, 'dd/MM/yyyy')

    if (type === 'income') {
      const category = categoriesToIncome.find(
        (item) => item.id === categoryUUID,
      )

      if (category !== undefined) {
        const newIncome: Income = {
          description,
          date: formattedDate,
          value,
          category,
          isReceived: isPayOrIsReceived,
        }

        createNewIncome(newIncome)
        reset()
      }
    } else if (type === 'expense') {
      const category = categoriesToExpense.find(
        (item) => item.id === categoryUUID,
      )

      if (category !== undefined) {
        const newExpense: Expense = {
          description,
          date: formattedDate,
          value,
          category,
          isPay: isPayOrIsReceived,
        }

        createNewExpense(newExpense)
        reset()
      }
    }

    reset()
  }

  return (
    <ModalScreen title="Nova transação">
      <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <S.TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <S.TransactionTypeButton
                  value="income"
                  variant="income"
                  onClick={() => handleSetTypeOptions('income')}
                >
                  <ArrowCircleUp size={24} />
                  Entrada
                </S.TransactionTypeButton>

                <S.TransactionTypeButton
                  value="expense"
                  variant="expense"
                  onClick={() => handleSetTypeOptions('expense')}
                >
                  <ArrowCircleDown size={24} />
                  Saída
                </S.TransactionTypeButton>
              </S.TransactionType>
            )
          }}
        />

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
          className="inputDate"
          type="date"
          required
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
          Cadastrar
        </button>
      </form>
    </ModalScreen>
  )
}
