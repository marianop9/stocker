import { ref, shallowRef } from 'vue'

export function useService<T>(service: () => Promise<T>) {
    const loading = ref(true)
    const error = ref(false)
    const data = shallowRef<T | null>(null)

    service()
        .then((value: T) => {
            data.value = value
            loading.value = false
        })
        .catch((err) => {
            console.log(err)
            error.value = true
        })

    return {
        loading,
        error,
        data,
    }
}
