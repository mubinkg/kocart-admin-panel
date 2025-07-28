import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export const FormInput = ({ form, label, placeholder, name }: { form: any, label: string, placeholder: string, name: string }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}

                            type=""
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}